class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    posts = Post.reduce(params).order(created_at: :desc)
    render json: posts, include: %w(upvoters user comments comments.user documents)
  end

  def create
    publication = Publication.new(post_params)
    publication.user = current_user

    unless publication.save
      render_json_validation_error publication
      return
    end

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

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit( :course_id, :message, attachments: [] )
    end

end