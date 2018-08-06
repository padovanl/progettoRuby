class CoursesController < ApplicationController
  def indexCourse
    render json: Course.all
  end
  def createCourse
    fruit = Course.create(fruit_params)
    render json: fruit
  end

  def destroyCourse
    Course.destroy(params[:id])
  end

  def updateCourse
    fruit = Course.find(params[:id])
    fruit.update_attributes(fruit_params)
    render json: fruit
  end

  private
  def course_params
    params.require(:fruit).permit(:name, :year)
  end
end