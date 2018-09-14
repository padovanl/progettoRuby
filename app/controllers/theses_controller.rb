class ThesesController < ApplicationController

  def index
    @theses =Thesis.all.page(params[:page]).per(3)
    @last_page = @theses.total_pages
    @current_user_avatar = get_avatar_image
    respond_to do |format|
      format.html
      format.json {render json: @theses, :include => {:tags => {:only => :name}, :teacher => {:only => [:name, :surname, :link_cv]}} }
    end
  end


  def show
  end
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