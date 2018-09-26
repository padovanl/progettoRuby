class Api::V1::UserCoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :user_compile_survey?, only: [:show]
  before_action :user_follows_course_for_survey?, only: [:show]


  def show
    course_followed = UserCourse.where("course_id = ? AND user_id = ?", params['id'], params['user_id']).first
    respond_to do |format|
      format.html
      format.json do
        json_response(course_followed.to_json)
      end
    end
  end

  def update
    user_course = UserCourse.find(params[:id])
    unless !user_course.update_attributes(user_courses_params)
      json_response(user_course.to_json)
      return
    end
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
