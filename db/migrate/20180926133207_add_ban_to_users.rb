class AddBanToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :ban, :boolean, :default => false
  end
end
