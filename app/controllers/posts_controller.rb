class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @posts = Post.includes([:user, :documents]).posts_of_a_course(params[:course_id])
                        .with_comments_count
    json_response(@posts.to_json(include: [:user, :documents]))
  end

  def show
    json_response(@publication)
  end

  def new
    @post = Post.new
    @courses = Course.all
  end

  def edit
  end

  def create

    # logger.debug("HEEEEE #{params[:post][:allegati]}")

    @publication = Publication.new(post_params)
    @publication.user = current_user
    @post = Post.new

    respond_to do |format|
      if @publication.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
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

end