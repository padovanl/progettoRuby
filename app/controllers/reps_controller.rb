class RepsController < ApplicationController

  def index
    @reps = Rep.reduce(params).order(created_at: :desc).page(params[:page]).per(3)
    @last_page = @reps.total_pages
    @current_user_image = get_avatar_image
    @current_user = current_user
    respond_to do |format|
      format.html
      format.json {render json: @reps, :include => {:course => {:only => :name}, :user => {:only => [:name, :image, :last_sign_in_at, :current_sign_in_ip]} } }
    end
  end

  def new

  end

  def create

  end

  def show

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def get_avatar_image
    if current_user.avatar.attached?
      return rails_representation_url(current_user.avatar.variant(resize: "100x100"), only_path: true)
    elsif not current_user.image.blank?
      return current_user.image
    else
      return ActionController::Base.helpers.asset_path("dragon.png")
    end
  end

end
