require 'test_helper'

class CourseQuestionTest < ActiveSupport::TestCase
  test "should have a question" do
    course_question = CourseQuestion.new
    assert_not course_question.save
  end
end
