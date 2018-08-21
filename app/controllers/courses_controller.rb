class CoursesController < ApplicationController

 # before_filter :search_course

  #def index
   # if params[:search]
    #  @tcs = TeacherCourse.search(params[:search]).all;
    #else
    #  @tcs = TeacherCourse.all;
    #end
    #render json: @tcs.order(data: :desc).all.as_json(:include => [{:course => {:only => [:name, :year]}}, :teacher => {:only => [:name, :surname, :link_cv]}]);
  #end

  def allcourses
    if params[:search]
      #ho usato eager_load in quanto fa una left join e quindi lavora su entrambe le tab, con includes mi dava errore in quanto courses non si trova nella tab: teacherCourse
      @tcs = TeacherCourse.eager_load(:course, :teacher).where('courses.name LIKE ?', "%#{params[:search]}%").order(year: :desc).page(params[:page]).per(30)
      @search = 'Analisii'
      @page = :page
    else
      @tcs = TeacherCourse.includes(:course, :teacher).order(year: :desc).page(params[:page]).per(3)
      @search = ''
      @page = :page
    end
  end


  def next

  end

  def show

  end
end
