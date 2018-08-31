class CoursesController < ApplicationController
   before_action :authenticate_user!
  #before_action ->{ authenticate_user!(force: true) }
 # before_filter :search_course

  #def index
   # if params[:search]
    #  @tcs = TeacherCourse.search(params[:search]).all;
    #else
    #  @tcs = TeacherCourse.all;
    #end
    #render json: @tcs.order(data: :desc).all.as_json(:include => [{:course => {:only => [:name, :year]}}, :teacher => {:only => [:name, :surname, :link_cv]}]);
  #end

  def search_degrees
    @degree = DegreeCourse.search_degrees(params[:degree])
    respond_to do |format|
      format.json { render json: @degree }
    end
  end

  def allcourses
    #ho usato eager_load in quanto fa una left join e quindi lavora su entrambe le tab, con includes mi dava errore in quanto courses non si trova nella tab: teacherCourse
    #@tcs = TeacherCourse.eager_load(:course, :teacher).where('courses.name LIKE ?', "%#{params[:search]}%").order(year: :desc).page(params[:page]).per(2)
    @tcs = TeacherCourse.search_courses_not_followed(params[:degreen], params[:degreet], params[:category], params[:search], current_user.id).page(params[:page]).per(3)
    @last_page = @tcs.total_pages
    @categories = %w[Name Data Teacher Year]
  end

  def follow

  end

  def show
    @course = Course.find(params[:id])
    @degree_course = DegreeCourse.find(@course.degree_course_id)
    @current_teacher_course = @course.teacher_courses.order(year: :desc).to_a[-1].teacher

    #sistemare current teacher course nel modello e trovare il modo di beccare il professore più recente

  end


end
