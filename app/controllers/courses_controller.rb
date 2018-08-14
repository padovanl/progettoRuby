class CoursesController < ApplicationController
  def index
    render json: Course.first(9);
  end

  def show

  end
end
