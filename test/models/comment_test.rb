require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  test "should have a content" do
    comment = Comment.new
    assert_not comment.save
  end
end
