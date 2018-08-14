class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    #filter_posts
    #@posts = Post.posts_of_a_course(params[:course_id]).user_posts(1).order(created_at: :desc)
    @posts = Post.reduce(params).order(created_at: :desc)
    render json: @posts, include: %w(user comments comments.user documents)
    # json_response(@posts.to_json(include: [:user, :documents, :comments]))
  end

  def show
    render json: @post
  end

  def new
    @post = Post.new
    @courses = Course.all
  end

  def edit
  end

  def create
    @publication = Publication.new(post_params)
    @publication.user = current_user

    if @publication.save
      json_response(@publication.post.to_json(include: :documents), :created)
    else
      # format.json { render json: @post.errors, status: :unprocessable_entity }
    end
  end


  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_params
    params.require(:post).permit( :course_id, :message, attachments: [] )
  end
  def filter_posts
    params.require(:course_id).permit( :user_id )
  end

end