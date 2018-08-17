class UpvoteChannel < ApplicationCable::Channel
  def subscribed
    @post = Post.find_by(id: params[:room])
    stream_for @post
  end
  def received(data)
    UpvoteChannel.broadcast_to(@post, {post: @post, upvoters: Upvote.find_by(post_id: @post.id)})
  end
  def unsubscribed
  end
end
