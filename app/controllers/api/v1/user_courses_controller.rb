class Api::V1::UserCoursesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    course_followed = UserCourse.where("course_id = ? AND user_id = ?", params['id'], params['user_id'])
    respond_to do |format|
      format.html
      format.json do
        json_response(course_followed.to_json)
      end
    end
  end

  # l'index di questo controller visto che usa l'utente nel path mi faccio ritornare la pagina da compilare per le statistiche
  # del corso ovvero il sondaggio

  def index

  end

  def update
    user_course = UserCourse.find(params[:id])
    user_course.update_attributes(user_courses_params)
    redirect_to 'http://www.rubyonrails.org'
    json_response(user_course.to_json)
  end

  private
  def user_courses_params
    params.require(:userCourses).permit(:course_rate,
                                         :material_quality,
                                         :explanation,
                                         :average_attempts,
                                         :average_days,
                                         :course_id,
                                         :user_id,
                                         :passed)
  end

end
