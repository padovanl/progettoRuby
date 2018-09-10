class TeachersController < ApplicationController

  def teachers_name
    @teachers_name = Teacher.get_names_complete
    respond_to do |format|
      format.json { render json: @teachers_name }
    end
  end

end
