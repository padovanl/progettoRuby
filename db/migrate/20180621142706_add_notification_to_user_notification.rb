class AddNotificationToUserNotification < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_notifications, :notification, foreign_key: true
  end
end
