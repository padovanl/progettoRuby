class Api::V1::TeacherCoursesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    teacherCourses = TeacherCourse.where(:course_id => params['course_id']).includes([:teacher, :course])
    json_response(teacherCourses.to_json(include: [:teacher, :course]))
  end
  def create
    temp = params['teacherCourse']['teacher_id']
    #data_parsed = json_decode(temp)
    teacherCollegati = TeacherCourse.where(course_id: params['course_id']).where(teacher_id: temp).where(year: params['teacherCourse']['year']).all
    if teacherCollegati.length > 0 then
      json_response({error: "Prof gia collegato"})
      return
    end

    t = TeacherCourse.create(teacherCourse_params)
    json_response(t.to_json(include: [:teacher]))
  end

  def destroy
    TeacherCourse.destroy(params[:id])
  end


  private
  def teacherCourse_params
    params.require(:teacherCourse).permit(:course_id, :teacher_id, :year)
  end
end