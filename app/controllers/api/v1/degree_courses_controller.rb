class Api::V1::DegreeCoursesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: DegreeCourse.all
  end
  def create
    course = DegreeCourse.create(degree_course_params)
    render json: course
  end

  def destroy
    DegreeCourse.destroy(params[:id])
  end

  def update
    course = DegreeCourse.find(params[:id])
    course.update_attributes(degree_course_params)
    render json: course
  end

  private
  def degree_course_params
    params.require(:degree_course).permit(:name, :tipo)
  end
end