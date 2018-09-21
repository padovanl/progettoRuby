class NotificationChannel < ApplicationCable::Channel
  def subscribed
    #@notification = Notification.all
    stream_from "notification"
  end

  def unsubscribed
  end
end
