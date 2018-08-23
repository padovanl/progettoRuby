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
    #ho usato eager_load in quanto fa una left join e quindi lavora su entrambe le tab, con includes mi dava errore in quanto courses non si trova nella tab: teacherCourse
    #@tcs = TeacherCourse.eager_load(:course, :teacher).where('courses.name LIKE ?', "%#{params[:search]}%").order(year: :desc).page(params[:page]).per(2)
    @tcs = TeacherCourse.search_course_teacher(params[:category], params[:search]).page(params[:page]).per(3)
    @last_page = @tcs.total_pages
    @categories = %w[Name Year Teacher Module]
  end




  def show

  end



end
