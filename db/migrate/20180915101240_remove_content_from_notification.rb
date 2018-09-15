class RemoveContentFromNotification < ActiveRecord::Migration[5.2]
  def change
    remove_column :notifications, :content, :string
  end
end
