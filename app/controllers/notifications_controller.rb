class NotificationsController < ApplicationController

  before_action :authenticate_user!

  def getCount
    n = Notification.get_user_recent_notification(current_user).unread
    json_response(n.length.to_json)
  end

  def index
    notifications = Notification.get_user_notifications(current_user).notifications_page(params[:page], 30)
    @last_page = notifications.total_pages
    respond_to do |format|
      format.html
      format.json {render json: notifications, :include => {:actor => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable => {}} }
    end
  end

  def markAsRead
    notification = Notification.find(params[:id])
    unless !notification.update(read_at: Time.zone.now)
      render json: {success: true}
      return
    end
    render json: {success: false}
  end

  def notificationsNavBar
    notifications_nav = Notification.get_user_notifications(current_user).unread.limit(3)
    respond_to do |format|
      format.json {render json: notifications_nav, :include => {:actor => {:only => [:id, :email, :avatar_url, :name, :admin]}, :notifiable =>{} } }
    end
  end

  def destroy
    Notification.destroy(params[:id])
  end

  def updateIsSelected
    notifications = Notification.get_user_recent_notification(current_user).unread
    unless !notifications.update(isSelected: true)
      render json: {success: true}
      return
    end
    render json: {success: false}
  end
end