class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: User.all
  end

  def setAdmin
    user = User.find(params[:user_id])
    user.admin = true;
    user.save
    render json: user
  end

  def blockUser
    user = User.find(params[:user_id])
    user.ban = true;
    user.save
    render json: user
  end

  def unblockUser
    user = User.find(params[:user_id])
    user.ban = false;
    user.save
    render json: user
  end

end