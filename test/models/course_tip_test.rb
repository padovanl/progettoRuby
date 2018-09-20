require 'test_helper'

class CourseTipTest < ActiveSupport::TestCase
  test "should have a tip" do
    course_tip = CourseTip.new
    course_tip.user = User.first
    course_tip.course = Course.first
    course_tip.tip = ''
    assert_not course_tip.save
  end
end
