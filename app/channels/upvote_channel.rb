class UpvoteChannel < ApplicationCable::Channel
  def subscribed
    post = Post.find_by(id: params[:room])
    stream_for post
  end

  def unsubscribed
  end
end
