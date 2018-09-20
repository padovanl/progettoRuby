require 'test_helper'

class TeacherCourseTest < ActiveSupport::TestCase
  test "should have a year" do
    t = TeacherCourse.new
    t.teacher = Teacher.first
    t.course = Course.first
    t.year = ""
    assert_not t.save
  end

  test "year should be in express in format AAAA-AAAA" do
    t = TeacherCourse.new
    t.teacher = Teacher.first
    t.course = Course.first
    t.year = "1-14-as-ase"
    assert_not t.save
  end
end
