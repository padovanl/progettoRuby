class Api::V1::CoursesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    courses = Course.where(:degree_course_id => params['degree_course_id']).includes([:degree_course])
    json_response(courses.to_json(include: [:degree_course]))
  end


  def create
    course = Course.create(course_params)
    render json: course
  end

  def destroy
    Course.destroy(params[:id])
  end

  def update
    course = Course.find(params[:id])
    course.update_attributes(course_params)
    #invio notifica agli utenti che seguono il corso
    #users = course.users;
    #users.each do |u|
    #  Notification.create(recipient: u, actor: current_user, action: "ha modificato il nome del corso", notifiable: course)
    #end

    render json: course
  end

  private
  def course_params
    params.require(:course).permit(:name, :year, :degree_course_id)
  end
end

