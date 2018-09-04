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
    @cs = Course.search_courses_not_followed(params[:degreen], params[:degreet], params[:category], params[:search], current_user.id).page(params[:page]).per(3)
    @last_page = @cs.total_pages
    @categories = %w[Name Data Teacher Year]
  end

  def mycourses
    @cs = Course.search_courses_followed(params[:degreen], params[:degreet], params[:category], params[:search], current_user.id).page(params[:page]).per(3)
    @last_page = @cs.total_pages
    @categories = %w[Name Data Teacher Year]
  end

  def follow
    logger.debug "PARAMETRI ****************** #{user_course_param}"
    logger.debug "PARAMETRI ****************** COURSE_ID #{user_course_param[:course_id]}"

    @user_course = UserCourse.first_update_or_create(user_course_param[:course_id], current_user.id)
    #controllo errore
    render json: @user_course, status: :created
  end

   def unfollow
     @user_course = UserCourse.update(user_course_param[:course_id],current_user.id)
     #controllo errore
     render json: @user_course, status: :created
   end

  def show
    @course = Course.find(params[:id])
    @degree_course = DegreeCourse.find(@course.degree_course_id)

    #controllo se il corso che devo mostrare ha almeno un professore assegnato perchè se no da errore.
    # mentre nella pagina html show ho inserito un componente react dove all'interno vado a fare un controllare
    # se il professore esiste perchè in tal caso se ancora non è stato assegnato alcun professore
    # mi spunta la scritta che non è stato assegnato ancora alcun professore
    if (!@course.teacher_courses.order(year: :desc).empty?)
      @current_teacher_course = @course.teacher_courses.order(year: :desc).to_a[-1].teacher
    else
      @current_teacher_course = nil
    end
    #sistemare current teacher course nel modello e trovare il modo di beccare il professore più recente

  end


   private
     def user_course_param
       params.require(:user_course).permit(:course_id, :follow)
     end

end
