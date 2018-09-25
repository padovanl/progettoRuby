class QuestionsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_notification, only: :create
  after_action ->(type_object) { destroy_report_and_notification('CourseQuestion') }, only: [:destroy]


  def index
    courseQuestions = CourseQuestion.get_course_questions(params['course_id'])
    json_response(courseQuestions.to_json(include: [:user, :course, :frequency_questions]))
  end

  def create
    question = CourseQuestion.create!(question_params)
    unless !question.valid?
      frequency_questions = question.frequency_questions.create!({user_id: question_params[:user_id], course_question_id: question.id})
      unless !frequency_questions.valid?
        Notification.send_notifications(params['course_id'], current_user, "ha inserito una nuova", question)
        json_response(question.to_json(include: [:user, :course, :frequency_questions]))
      end
      return
    end
    render_json_validation_error question
  end

  def destroy
    unless CourseQuestion.destroy(params[:id])
      render_json_validation_error course_tip
      return
    end
    head :no_content
  end

  def update
    question = CourseQuestion.find(params[:id])
    unless !question.update_attributes(question_params)
      json_response(question.to_json(include: [:frequency_questions]))
      return
    end
  end

  def reportQuestion
      Report.send_report(params[:id], current_user.id,
                         params[:reportReason][:reason],
                         CourseQuestion.find(params[:id]),
                         "CourseQuestion",
                         "È stata segnalata una")
      respond_to do |format|
        format.json { head :ok }
      end
    end

  private
  def question_params
    params.require(:courseQuestion).permit(:course_id, :user_id, :question)
  end

end
