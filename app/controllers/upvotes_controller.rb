class UpvotesController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_to_channel

  def create
    @upvote = Upvote.new()
    @upvote.upvoter = current_user
    @upvote.post_id = params['post_id']

    if !@upvote.save
      render_json_validation_error @upvote
      return
    end

    render json: @upvote, status: :created
  end


  def destroy
    @upvote = Upvote.current_upvoter(current_user, params[:id]).first

    if !@upvote.destroy
      render_json_validation_error @upvote
      return
    end

    render json: @upvote
  end

  private
    def broadcast_to_channel
      post = @upvote.post

      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          PostSerializer.new(post), { include: %w(upvoters user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to post, serialized_data
    end
end
