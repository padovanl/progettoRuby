require 'test_helper'

class DegreeCourseTest < ActiveSupport::TestCase
  test "should have a name" do
    course = DegreeCourse.new
    course.tipo = "triennale"
    course.name = ""
    course.id = 27
    assert_not course.save
  end

  test "should have a type" do
    course = DegreeCourse.new
    course.tipo = ""
    course.name = "Nome"
    course.id = 27
    assert_not course.save
  end

  test "type should be Magistrale or Triennale" do
    course = DegreeCourse.new
    course.tipo = "NonMagistrale"
    course.name = "Nome"
    course.id = 27
    assert_not course.save
  end

end
