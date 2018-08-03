class CoursesController < ApplicationController
  def index
    @courses = Course.all
  end

  def show

  end

  def create #lo fa solo l'amministratore?
  end

end
