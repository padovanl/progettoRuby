class CommentsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_to_channel, only: [:create, :destroy]

  def create
    @comment = current_user.comments.new(comment_params)

    if !@comment.save
      render_json_validation_error @comment
      return
    end

    render json: @comment, status: :created
  end

  def destroy
    @comment = current_user.comments.find(params[:id])

    if !@comment.destroy
      render_json_validation_error @comment
      return
    end

    Report.where(:reportable_id => params[:id]).where(:reportable_type => "Comment").destroy_all
    head :no_content
  end

  def reportComment

    report = Report.where(:reportable_id => params[:id]).where(:reportable_type => "Comment").first
    if (report != nil)
      UserReport.create!(user_id: current_user.id, report_id: report.id)
    else
      comment = Comment.find(params[:id])
      r = Report.create(action: "È stato segnalato un post", reportable: comment)
      UserReport.create!(user_id: current_user.id, report_id: r.id)
    end
  end

  private
    def comment_params
      params.require(:comment).permit( :content, :post_id )
    end

    def broadcast_to_channel
      post = @comment.post

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(post), { include: %w(upvoters user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to post, serialized_data
    end
end
