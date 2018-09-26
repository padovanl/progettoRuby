class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:index, :destroy]
  before_action :user_follow_course?, only: [:index, :destroy]
  after_action :broadcast_notification, only: [:create, :destroy]
  after_action ->(type_object) { destroy_report_and_notification('Post') }, only: [:destroy]
  before_action :destroy_report_comment_of_post, only: :destroy

  def index
    posts = Post.reduce(params).order(created_at: :desc).uniq
    render json: posts, include: %w(upvoters user comments comments.user documents)
  end

  def create
    publication = Publication.new(post_params)
    publication.user = current_user

    unless publication.save
      render_json_validation_error publication
      return
    end

    Notification.send_notifications(post_params['course_id'], current_user, "ha inserito un nuovo", publication.post)
    render json: publication.post, include: %w(upvoters user comments comments.user documents), status: :created
  end


  def destroy
    @post = Post.current_user_post(current_user, params[:id]).first

    if !@post.destroy
      render_json_validation_error @post
      return
    end

    head :no_content
  end

  def reportPost
    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       Post.find(params[:id]),
                       "Post",
                       "È stato segnalato un")
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
  def post_params
    params.require(:post).permit( :course_id, :message, attachments: [] )
  end
end