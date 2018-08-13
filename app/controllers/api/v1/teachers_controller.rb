class Api::V1::TeachersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Teacher.all
  end
  def create
    teach = Teacher.create(teach_params)
    render json: teach
  end

  def destroy
    Teacher.destroy(params[:id])
  end

  def update
    teach = Teacher.find(params[:id])
    teach.update_attributes(teach_params)
    render json: teach
  end

  private
  def teach_params
    params.require(:teacher).permit(:name, :surname, :link_cv)
  end
end