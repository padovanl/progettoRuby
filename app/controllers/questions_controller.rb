class QuestionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    courseQuestions = CourseQuestion.where(:course_id => params['course_id']).includes([:user, :course, :frequency_questions])
    json_response(courseQuestions.to_json(include: [:user, :course, :frequency_questions]))
  end

  def create
    #NOTA: non sapendo bene come creare in automatico l'associazione per la questione delle frequenze delle domande
    # nella tabella frequency_questions per ora l'ho adattato così e funziona
    # così non mi da neanche alcun problema riguardante i parametri che gli passo poi
    # come risposta via json


    @q = CourseQuestion.create(question_params)
    #q.frequency_questions.build(:user_id => current_user.id, :course_question_id => params[:course_id])
    frequency_questions = FrequencyQuestion.create({user_id: question_params[:user_id], course_question_id: @q.id})
    courseQuestions = CourseQuestion.where(:id => @q.id).includes([:user, :course, :frequency_questions])

    #invio notifica
    @course = Course.find(question_params[:course_id])
    @course.users.each do |user|
      Notification.create(recipient: user, actor: current_user, action: "Question", notifiable: @q)
    end

    json_response(courseQuestions.to_json(include: [:user, :course, :frequency_questions]))
  end

  def destroy
    CourseQuestion.destroy(params[:id])
  end

  def update
    quest = CourseQuestion.find(params[:id])
    quest.update_attributes(question_params)
    json_response(quest.to_json(include: [:frequency_questions]))
  end

  private
  def question_params
    params.require(:courseQuestion).permit(:course_id, :user_id, :question)
  end

end
