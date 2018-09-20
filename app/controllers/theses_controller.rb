class ThesesController < ApplicationController

  def theses_title
    render json: Thesis.get_titles, each_serializer: ThesesNameSerializer
  end

  def index
    @theses =Thesis.reduce(params).order(created_at: :desc).page(params[:page]).per(3)
    @last_page = @theses.total_pages
    @current_user_avatar = get_avatar_image
    respond_to do |format|
      format.html
      format.json {render json: @theses, :include => {:tags => {:only => :name}, :teacher => {:only => [:name, :surname, :link_cv]}} }
    end
  end


  def show
    @thesis =Thesis.reduce(params).find(params['id'])
    @current_user_avatar = get_avatar_image
    #respond_to do |format|
    #  format.html
    #  format.json {render json: @theses, :include => {:tags => {:only => :name}, :teacher => {:only => [:name, :surname, :link_cv]}} }
    #end
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
