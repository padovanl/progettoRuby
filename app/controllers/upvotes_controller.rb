class UpvotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_upvote, only: [:destroy]
  after_action :broadcast_to_channel

  def create
    @upvote = Upvote.new()
    @upvote.post_id = params['post_id']
    @upvote.user_id = current_user.id

    if @upvote.save
      #json_response(@upvote.to_json, :created)
    else
    end
  end


  def destroy
    if(@upvote.user_id == current_user.id)
      @upvote.destroy
    end
  end

  private
    def set_upvote
      @upvote = Upvote.find(params[:id])
    end

    def broadcast_to_channel
      @post = Post.find(@upvote.post_id)

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(@post), { include: %w(user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to @post, serialized_data
      head :ok
    end
end
