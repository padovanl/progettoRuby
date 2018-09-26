class AdminController < ApplicationController
  before_action :authenticate_user!, :current_user_admin?

  def dashboard
    render 'dashboard'
  end

  def thesis_tags
    id_tesi = params[:thesis_id]
    @thesis = Thesis.find(id_tesi)
    render 'thesis_tag'
  end

  def courses
    id_d_course = params[:degree_course_id]
    @degree = DegreeCourse.find(id_d_course)
    render 'courseDashboard'
  end

  def teacher_courses
    id_course = params[:course_id]
    @course = Course.find(id_course)
    render 'admin/teacher_course'
  end

  def mailing_list

  end

  skip_before_action :verify_authenticity_token
  def send_emails
    @users = User.where(news: true).all
    text = params['text']
    titolo = params['titolo']
    @users.each do |u|
      UserNotifierMailer.send_signup_email(u, text, titolo).deliver
    end

    json_response({error: "Errore"})
    return
  end
end