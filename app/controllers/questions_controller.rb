class QuestionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    courseQuestions = CourseQuestion.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseQuestions.to_json(include: [:user, :course]))
  end

  def create
    q = CourseQuestion.create(question_params)
    json_response(q.to_json)
  end

  def destroy
    CourseQuestion.destroy(params[:id])
  end

  def update
    quest = CourseQuestion.find(params[:id])
    quest.update_attributes(question_params)
    json_response(quest.to_json)
  end

  private
  def question_params
    params.require(:courseQuestion).permit(:course_id, :user_id, :question)
  end

end
