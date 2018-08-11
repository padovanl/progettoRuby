class CoursesController < ApplicationController
  def index
    render json: Course.all

  end

  def show

  end

  def create #lo fa solo l'amministratore?

  end

end
