class AddUserToUserNotification < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_notifications, :users, foreign_key: true
  end
end
