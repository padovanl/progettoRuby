require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test "should have a message" do
    post = Post.new
    post.user = User.first
    post.course = Course.first
    post.message = ""
    assert_not post.save
  end
end
