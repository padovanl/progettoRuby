class DropUserNotification < ActiveRecord::Migration[5.2]
  def change
    drop_table :user_notifications
  end
end
