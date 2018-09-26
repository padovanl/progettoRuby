class RepsController < ApplicationController
  before_action :authenticate_user!
  after_action :broadcast_notification, only: [:create, :destroy]
  after_action ->(type_object) { destroy_report_and_notification('Rep') }, only: [:destroy]

  def index
  #  if validate_per_page
  #    @reps = Rep.reduce(params).order(created_at: :desc).page(params[:page]).per(params[:per_page])
  #    @per_page = params[:per_page]
  #  else
    @reps = Rep.reduce(params).order(created_at: :desc).page(params[:page]).per(10)
    @per_page = 10
  #  end
    @last_page = @reps.total_pages
    @current_user_image = get_avatar_image
    @current_user = current_user
 #   @chose_per_page = %w[3 10 20 30]
    respond_to do |format|
      format.html
      format.json {render json: @reps, :include => {:course => {:only => :name}, :user => {:only => [:id, :email, :avatar_url, :name, :admin]} } }
    end
  end

  def show
    @rep = Rep.find(params[:id])
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

    Notification.send_notifications(course_id, current_user, "", rep)
    render json: rep, :include => {:course => {:only => :name}, :user => {:only => [:id, :name, :image, :email, :last_sign_in_at, :current_sign_in_ip]} }, status: :created
  end

  def update
    rep = Rep.current_user_rep(current_user, params[:id]).first
    rep.update(rep_params)
    rep.course_id = Rep.get_course_id(get_course_name[:course_name])
    rep.save
    if !rep
      render_json_validation_error rep
      return
    end
    render json: rep, :include => {:course => {:only => :name}, :user => {:only => [:id, :name, :image, :email, :last_sign_in_at, :current_sign_in_ip]} }
  end

  def destroy
    @rep = Rep.current_user_rep(current_user, params[:id]).first

    if !@rep.destroyupdated_rep
      render_json_validation_error @rep
      return
    end

    head :no_content
  end


  def send_email
    logger.debug "PARAMETRI ****************** #{[params[:content], params[:course_id]]}"
    email = Rep.send_email(current_user, params[:content], params[:course_id])
    if !email
      render_json_validation_error email
      return
    end
    render json: email
  end

  def get_name
    avatar =User.find(params[:id]).get_avatar_image
    render json: avatar
  end

  def reportRep
    Report.send_report(params[:id], current_user.id,
                       params[:reportReason][:reason],
                       Rep.find(params[:id]),
                       "Rep",
                       "È stata segnalata un")
    respond_to do |format|
      format.json { head :ok }
    end
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

  def rep_params
    params.require(:rep).permit(:description, :offer, :user_competence, :price_hours, :place, :home_service, :week_days)
  end

  def get_course_name
    params.require(:rep).permit(:course_name)
  end

end
