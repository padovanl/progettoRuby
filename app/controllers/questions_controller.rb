class QuestionsController < ApplicationController


  def index
    courseQuestions = CourseQuestion.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseQuestions.to_json(include: [:user, :course]))
  end

  private
  def question_params
    params.require(:question_p).permit(:question, :frequency)
  end

end
