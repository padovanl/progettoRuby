require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  test "should have a name" do
    course = Course.new
    assert_not course.save
  end
end
