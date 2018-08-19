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

    head :no_content
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit( :content, :post_id )
    end

    def broadcast_to_channel
      post = @comment.post

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(post), { include: %w(user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to post, serialized_data
    end
end
