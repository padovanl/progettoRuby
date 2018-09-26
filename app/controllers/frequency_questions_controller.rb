class FrequencyQuestionsController < ApplicationController
  before_action :authenticate_user!

  #l'index mi sa che neanche lo uso
  def index
    courseQuestions = CourseQuestion.where(:course_id => params['course_id']).includes([:user, :course])
    json_response(courseQuestions.to_json(include: [:user, :course]))
  end

  def create
    frequency_questions = FrequencyQuestion.create({user_id: question_frequency_params[:user_id], course_question_id: question_frequency_params[:course_question_id]})
    unless frequency_questions.valid?
      render_json_validation_error frequency_questions
      return
      end
    json_response(frequency_questions.course_question.to_json(include: [:frequency_questions]))
    end

  def destroy
    frequency_question = FrequencyQuestion.destroy(params[:id])
    unless frequency_question.valid?
      render_json_validation_error frequency_question
      return
    end
    json_response(frequency_question.course_question.to_json(include: [:frequency_questions]))
  end

  private
  def question_frequency_params
    params.require(:frequencyQuestion).permit(:course_question_id, :user_id)
  end

end
