class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_comment, only: [:destroy]
  after_action :broadcast_to_channel, only: [:create, :destroy]

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user

    if @comment.save
      json_response(@comment, :created)
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.json { render :show, status: :ok, location: @comment }
      else
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    respond_to do |format|
      if (@comment.user_id == current_user.id)
        if @comment.destroy
          format.json { head :no_content }
        end
      else
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit( :content, :post_id )
    end

    def broadcast_to_channel
      @post = Post.find(@comment.post_id)

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(@post), { include: %w(user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to @post, serialized_data
      head :ok
    end
end
