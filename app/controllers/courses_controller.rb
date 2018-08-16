class CoursesController < ApplicationController

 # before_filter :search_course

  def index
    if params[:search]
      @tcs = TeacherCourse.search(params[:search]).all;
    else
      @tcs = TeacherCourse.all;
    end
    render json: @tcs.order(data: :desc).all.as_json(:include => [{:course => {:only => [:name, :year]}}, :teacher => {:only => [:name, :surname, :link_cv]}]);
  end

  #def allcourses
   # if params[:search]
    #  @tcs = TeacherCourse.course.search(params[:search]).all.order(data: :desc).page(params[:page]).per(4)
    #else
    #  @tcs = TeacherCourse.all.order(data: :desc).page(params[:page]).per(4)
    #end

  #end


  def next

  end

  def show

  end
end
