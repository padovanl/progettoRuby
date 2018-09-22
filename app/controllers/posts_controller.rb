class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:index, :destroy, :reportPost]
  before_action :user_follow_course?, only: [:index, :destroy, :reportPost]

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

    #invio notifica
    course = Course.find(post_params[:course_id])
    course.users.uniq.each do |user|
      Notification.create(recipient: user, actor: current_user, action: "ha inserito un nuovo", notifiable: publication.post)
    end

    render json: publication.post, include: %w(upvoters user comments comments.user documents), status: :created
  end


  def destroy
    @post = Post.current_user_post(current_user, params[:id]).first

    if !@post.destroy
      render_json_validation_error @post
      return
    end

    Notification.where(notifiable_id: params[:id]).where(notifiable_type: "Post").destroy_all
    Report.where(reportable_id: params[:id]).where(reportable_type: "Post").destroy_all
    head :no_content
  end

  def reportPost
    post = Post.find(params[:id])
    report = Report.where(:reportable_id => params[:id]).where(:reportable_type => "Post").first

    if (report != nil)
      UserReport.create!(user_id: current_user.id, report_id: report.id)
    else
      r = Report.create(action: "È stato segnalato un", reportable: post)
      UserReport.create!(user_id: current_user.id, report_id: r.id)
    end

    #end
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
  def post_params
    params.require(:post).permit( :course_id, :message, attachments: [] )
  end


end