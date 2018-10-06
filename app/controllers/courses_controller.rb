class CoursesController < ApplicationController
   before_action :authenticate_user!
   before_action :destroy_notification_comment_unfollow_upvote, only: [:unfollow]
   after_action :broadcast_notification, only: [:unfollow]

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
    # se passo il parametro per_page, allora utilizzo quello (se valido)
    # se non dovesse essere passato (o non è valido), allora uso il 3
    # tra le pagine uso lo standard che è 10 per pagina
    if validate_per_page
      @cs = Course.allcourses_mycourses("allcourses", params, current_user).per(params[:per_page])
      @per_page = params[:per_page]
    else
      @cs = Course.allcourses_mycourses("allcourses", params, current_user).per(10)
      @per_page = 10
    end
    @last_page = @cs.total_pages
    @categories = %w[Course Teacher Year] #%w[Course Data Teacher Year]
    @chose_per_page = %w[3 10 20 30]
    respond_to do |format|
      format.html
      format.json { render json: @cs }
    end
  end

  def mycourses
    if validate_per_page
      @cs = Course.allcourses_mycourses("mycourses", params, current_user).per(params[:per_page])
      @per_page = params[:per_page]
    else
      @cs = Course.allcourses_mycourses("mycourses", params, current_user).per(10)
      @per_page = 10
    end
    @last_page = @cs.total_pages
    @categories = %w[Course Teacher Year] #%w[Course Data Teacher Year]
    @chose_per_page = %w[3 10 20 30]
    respond_to do |format|
      format.html
      format.json { render json: @cs }
    end
  end

  def follow
    @user_course = UserCourse.first_update_or_create(user_course_param, current_user.id)
    #controllo errore
    render json: @user_course, status: :created
  end

   def unfollow
     @user_course = UserCourse.update(user_course_param[:course_id],current_user.id)
     #controllo errore
     render json: @user_course, status: :created
   end

  def show
    @course_details = Course.get_all_courses_details(params[:id], current_user)
  end

  private
    def user_course_param
      params.require(:user_course).permit(:course_id, :follow)
    end

    def validate_per_page
      return false unless params[:per_page].present?
      %w(3 10 20 30).include?(params[:per_page])
    end


end
