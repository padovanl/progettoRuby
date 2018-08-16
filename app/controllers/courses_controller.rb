class CoursesController < ApplicationController

 # before_filter :search_course

  def index
     # render json: TeacherCourse.order(data: :desc).all.as_json(:include => [{:course => {:only => [:name, :year]}}, :teacher => {:only => [:name, :surname, :link_cv]}])
  end

  def allcourses
    @tcs = TeacherCourse.all.order(data: :desc).page(params[:page]).per(4)
  end


  def next

  end

  def show

  end
end
