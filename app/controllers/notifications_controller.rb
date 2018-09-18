class NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def getCount
    #n = Notification.where(recipient: current_user).where(:read_at => nil).all
    n = Notification.where(recipient: current_user).where("updated_at = created_at").unread
    json_response(n.length.to_json)
  end

  def index
    @notifications = Notification.order(created_at: :desc).where(recipient: current_user).page(params[:page]).per(1)
    @last_page = @notifications.total_pages
    #@notifications = Notification.where(recipient: current_user).unread
    respond_to do |format|
      format.html
      format.json {render json: @notifications, :include => {:recipient => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable => {}} }
    end
    #render json: @notifications, include: %w(recipient notifiable notifiable.post notifiable.post.course), status: :created
  end

  def markAsRead
    notification = Notification.find(params[:id])
    notification.update(read_at: Time.zone.now)
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

  def updateIsSelected
    notifications = Notification.where(recipient: current_user).where("updated_at = created_at").unread
    #if notifications.size > 0 -> a quanto pare non lo fa comunque se non ci sono notifiche
      notifications.update(isSelected: true)
    #end
    render json: {success: true}
  end

end