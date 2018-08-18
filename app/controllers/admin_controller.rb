class AdminController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    isAdmin = current_user.admin
    if isAdmin then
      render 'dashboard'
    else
      render 'admin/accessDenied', layout: false
    end
  end

  def thesis_tags
    id_tesi = params[:thesis_]
    isAdmin = current_user.admin
    if isAdmin then
      render 'thesis_tag'
    else
      render 'admin/accessDenied', layout: false
    end
  end

  def courses
    id_d_course = params[:degree_course_id]
    isAdmin = current_user.admin
    if isAdmin then
      render 'courseDashboard'
    else
      render 'admin/accessDenied', layout: false
    end
  end

  def teacher_courses
    id_course = params[:course_id]
    isAdmin = current_user.admin
    if isAdmin then
      render 'admin/teacher_course'
    else
      render 'admin/accessDenied', layout: false
    end
  end
end