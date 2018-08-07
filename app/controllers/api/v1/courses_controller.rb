class Api::V1::CoursesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Course.all
  end
  def create
    course = Course.create(course_params)
    render json: course
  end

  def destroy
    Course.destroy(params[:id])
  end

  def update
    course = Course.find(params[:id])
    course.update_attributes(course_params)
    render json: course
  end

  private
  def course_params
    params.require(:course).permit(:name, :year, :degree_course_id)
  end
end