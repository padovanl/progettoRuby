class FrequencyQuestionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    courseQuestions = CourseQuestion.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseQuestions.to_json(include: [:user, :course]))
  end

  def create
    frequency_questions = FrequencyQuestion.create({user_id: question_frequency_params[:user_id], course_question_id: question_frequency_params[:course_question_id]})
    courseQuestions = CourseQuestion.where(:id => question_frequency_params[:course_question_id]).includes([:user, :course, :frequency_questions])
    json_response(courseQuestions.to_json(include: [:user, :course, :frequency_questions]))
  end

  private
  def question_frequency_params
    params.require(:frequencyQuestion).permit(:course_question_id, :user_id)
  end

end
