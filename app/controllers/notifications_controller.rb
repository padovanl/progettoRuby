class NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def getCount
    #n = Notification.where(recipient: current_user).where(:read_at => nil).all
    n = Notification.where(recipient: current_user).unread
    json_response(n.length.to_json)
  end

  def index
    @notifications = Notification.order(created_at: :desc).where(recipient: current_user).unread.page(params[:page]).per(1)
    @last_page = @notifications.total_pages
    #@notifications = Notification.where(recipient: current_user).unread
    respond_to do |format|
      format.html
      format.json {render json: @notifications, :include => {:recipient => {:only => [:id, :email, :avatar_url_small, :name, :admin]}, :notifiable =>{:include => {:course=>{}}}}}
    end
  end

  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update.all(read_at: Time.zone.now)
    render json: {success: true}
  end

  def notificationsNavBar
    @notifications_nav = Notification.where(recipient: current_user).unread.limit(3)
    #json_response(@notifications_nav) -> crea problemi con il jsonbuilder come se lo vedesse in parte
    respond_to do |format|
      format.json {render json: @notifications_nav, :include => {:recipient => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable =>{} } }
    end
  end

  def destroy
    Notification.destroy(params[:id])
  end

end