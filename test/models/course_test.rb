require 'test_helper'



class CourseTest < ActiveSupport::TestCase

  #popola il db di test in automatico
  def setup
    Rails.application.load_seed
  end

  test "should have a name" do
    course = Course.new
    course.degree_course = DegreeCourse.first
    course.name = ""
    course.year = 1
    assert_not course.save
  end

  test "should have a year" do
    course = Course.new
    course.degree_course = DegreeCourse.first
    course.name = "Nome"
    course.year = nil
    assert_not course.save
  end

  test "year should be 1 or 2" do
    course = Course.new
    course.degree_course = DegreeCourse.first
    course.name = "Nome"
    course.year = 5
    assert_not course.save
  end

  test "follow Analisi Matematica I" do
    course = Course.find(1)

  end

end
