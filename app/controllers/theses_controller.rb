class ThesesController < ApplicationController

  def theses_title
    render json: Thesis.get_titles, each_serializer: ThesesNameSerializer
  end

  def index
    if validate_per_page
      @theses =Thesis.reduce(params).order(created_at: :desc).page(params[:page]).per(params[:per_page])
      @per_page = params[:per_page]
    else
      @theses =Thesis.reduce(params).order(created_at: :desc).page(params[:page]).per(3)
      @per_page = 3
    end
    @last_page = @theses.total_pages
    @current_user_avatar = get_avatar_image
    @chose_per_page = %w[3 10 20 30]
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


  private
    def validate_per_page
      return false unless params[:per_page].present?
      %w(3 10 20 30).include?(params[:per_page])
    end

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
