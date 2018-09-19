require 'test_helper'

class CourseQuestionTest < ActiveSupport::TestCase
  test "should have a question" do
    course_question = CourseQuestion.new
    course_question.user = User.first
    course_question.course = Course.first
    course_question.question = ''
    assert_not course_question.save
  end
end
