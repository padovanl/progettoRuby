class Api::V1::UserCoursesController < ApplicationController

  def show
    course_followed = UserCourse.where("course_id = ? AND user_id = ?", params['id'], params['user_id'])
    json_response(course_followed.to_json)
  end
end
