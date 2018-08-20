class Api::V1::ThesesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    #render json: Thesis.all
    @theses = Thesis.includes([:teacher]).all
    json_response(@theses.to_json(include: [:teacher]))
  end
  def create
    t = Thesis.create(t_params)
    #render json: t
    json_response(t.to_json(include: [:teacher]))
  end

  def destroy
    Thesis.destroy(params[:id])
  end

  def update
    t = Thesis.find(params[:id])
    t.update_attributes(t_params)
    #render json: t
    json_response(t.to_json(include: [:teacher]))
  end

  #def getThesis
  #  t = Thesis.find(params[:id])
  #  json_response(t.to_json(include: [:teacher]))
  #end
  #
  def searchByProf
    if params['teacher_id'] != "0" then
      theses = Thesis.where(:teacher_id => params['teacher_id']).includes([:teacher])
    else
      theses = Thesis.includes([:teacher]).all
    end
    json_response(theses.to_json(include: [:teacher]))
  end

  def searchByTitle
    if params['string'] != nil then
      theses = Thesis.where("lower(title) like ?", "%" + params['string'].downcase + "%").includes([:teacher]).all
    else
      theses = Thesis.includes([:teacher]).all
    end
    json_response(theses.to_json(include: [:teacher]))
  end

  private
  def t_params
    params.require(:thesis).permit(:title, :content, :teacher_id)
  end
end