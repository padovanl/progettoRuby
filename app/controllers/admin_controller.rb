class AdminController < ApplicationController
  before_action :authenticate_user!, :current_user_admin?

  def dashboard
    render 'dashboard'
  end

  def thesis_tags
    id_tesi = params[:thesis_]
    render 'thesis_tag'
  end

  def courses
    id_d_course = params[:degree_course_id]
    render 'courseDashboard'
  end

  def teacher_courses
    id_course = params[:course_id]
    render 'admin/teacher_course'
  end
end