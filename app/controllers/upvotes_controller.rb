class UpvotesController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_to_channel

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_json_error :not_found, :upvotes_not_found
  end

  def create
    @upvote = current_user.upvotes.new()
    @upvote.post_id = params['post_id']

    if !@upvote.save
      render_json_validation_error @upvote
      return
    end

    render json: @upvote, status: :created
  end


  def destroy
    @upvote = current_user.upvotes.find(params[:id])

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
          PostSerializer.new(post), { include: %w(user comments comments.user documents) }
      ).serializable_hash

      UpvoteChannel.broadcast_to post, serialized_data
    end
end
