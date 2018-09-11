class AddColumnUserNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :user_notifications, :letta, :boolean, { default: false}
  end
end
