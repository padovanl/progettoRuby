class NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def getCount
    #n = Notification.where(recipient: current_user).where(:read_at => nil).all
    n = Notification.where(recipient: current_user).unread
    json_response(n.length.to_json)
  end

  def index
    @notifications = Notification.where(recipient: current_user).unread
  end

  def mark_as_read
    @notifications = Notification.where(recipient: current_user).unread
    @notifications.update.all(read_at: Time.zone.now)
    render json: {success: true}
  end

  def destroy
    Notification.destroy(params[:id])
  end

end