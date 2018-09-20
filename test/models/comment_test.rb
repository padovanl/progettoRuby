require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  test "should have a content" do
    comment = Comment.new
    comment.post = Post.first
    comment.user = User.first
    comment.content = ""
    assert_not comment.save
  end
end
