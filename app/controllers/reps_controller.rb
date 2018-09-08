class RepsController < ApplicationController
  before_action :authenticate_user!

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

  def create
    #byebug

    course_id = Rep.get_course_id(get_course_name[:course_name])
    rep = Rep.new(rep_params )
    rep.user_id = current_user.id
    rep.course_id = course_id

    unless rep.save
      render_json_validation_error rep
      return
    end

    render json: rep, :include => {:course => {:only => :name}, :user => {:only => [:name, :image, :last_sign_in_at, :current_sign_in_ip]} }, status: :created
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

  def rep_params
    params.require(:rep).permit(:description, :offer, :user_competence, :price_hours, :place, :home_service, :week_days)
  end

  def get_course_name
    params.require(:rep).permit(:course_name)
  end

end
