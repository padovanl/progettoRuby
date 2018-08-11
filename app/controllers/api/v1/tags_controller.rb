class Api::V1::TagsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    render json: Tag.all
  end
  def create
    tag = Tag.create(tag_params)
    tag.user = current_user
    tag.save
    render json: tag
  end

  def destroy
    Tag.destroy(params[:id])
  end

  def update
    tag = Tag.find(params[:id])
    tag.update_attributes(tag_params)
    render json: tag
  end

  private
  def tag_params
    params.require(:tag).permit(:name)
  end
end