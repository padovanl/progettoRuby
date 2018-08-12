class Api::V1::ThesesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: Thesis.all
  end
  def create
    t = Thesis.create(t_params)
    render json: t
  end

  def destroy
    Thesis.destroy(params[:id])
  end

  def update
    t = Thesis.find(params[:id])
    t.update_attributes(t_params)
    render json: t
  end

  private
  def t_params
    params.require(:thesis).permit(:title, :content, :teacher_id)
  end
end