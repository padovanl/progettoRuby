class AddIsSelectedToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :isSelected, :boolean
  end
end
