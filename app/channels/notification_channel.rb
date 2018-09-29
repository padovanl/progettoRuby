class NotificationChannel < ApplicationCable::Channel
  def subscribed
    user = User.find_by(id: params[:user_id])
    stream_for user
  end

  def unsubscribed
  end
end
