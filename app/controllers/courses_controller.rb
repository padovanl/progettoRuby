class CoursesController < ApplicationController
   before_action :authenticate_user!
  #before_action ->{ authenticate_user!(force: true) }
 # before_filter :search_course

  def courses_name
    render json: Course.all
  end

  def search_degrees
    @degree = DegreeCourse.search_degrees(params[:degree])
    respond_to do |format|
      format.json { render json: @degree }
    end
  end

  def allcourses
    @cs = Course.search_courses_not_followed(params[:degreen], params[:degreet], params[:category], params[:search], current_user.id).page(params[:page]).per(3)
    @last_page = @cs.total_pages
    @categories = %w[Course Teacher Year] #%w[Course Data Teacher Year]
    @per_page = %w[3, 10, 20, 30]
  end

  def mycourses
    @cs = Course.search_courses_followed(params[:degreen], params[:degreet], params[:category], params[:search], current_user.id).page(params[:page]).per(3)
    @last_page = @cs.total_pages
    @categories = %w[Course Teacher Year] #%w[Course Data Teacher Year]
  end

  def follow
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

    if (!@course.teacher_courses.order(year: :desc).empty?)
      @history_teacher_course = Course.get_history_teachers(@course)
    else
      @history_teacher_course = nil
    end
    @mapping_statistiche = Course.get_statistical_informations(params[:id])
  end


   private
     def user_course_param
       params.require(:user_course).permit(:course_id, :follow)
     end

end
