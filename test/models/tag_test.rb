require 'test_helper'

class TagTest < ActiveSupport::TestCase
  test "should have a name" do
    tag = Tag.new
    assert_not tag.save
  end
end
