class CommentsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_to_channel, only: [:create, :destroy]
  after_action -> { destroy_report_and_notification('Comment') }, only: [:destroy]

  def create
    @course = Course.find(comment_params[:course_id])
    user_follow_course?
    @comment = current_user.comments.new(comment_params)

    if !@comment.save
      render_json_validation_error @comment
      return
    end
    # Invio una notifica a ogni utente che sta seguendo un posto tramite gli upvotes
    Notification.send_notifications(comment_params[:course_id], current_user, "commentato", @comment)

    render json: @comment, status: :created
  end

  def destroy
    # Solo gli admin e quelli che hanno creato il commento lo possono cancellare
    if current_user.admin
      @comment = Comment.find(params[:id])
    else
      @comment = current_user.comments.find(params[:id])
    end

    if !@comment.destroy
      render_json_validation_error @comment
      return
    end

    head :no_content
  end

  def reportComment
    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       Comment.find(params[:id]),
                       "Comment",
                       "È stato segnalato un")
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
    def comment_params
      params.require(:comment).permit( :content, :post_id, :course_id )
    end

    # Aggiorno in modalità push il post visualizzato da altri utenti
    # funzione eseguita dopo in seguito alle action di create e destroy
    def broadcast_to_channel
      post = @comment.post

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(post), { include: %w(upvoters user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to post, serialized_data
    end
end
