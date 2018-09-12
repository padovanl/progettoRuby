class AddNewsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :news, :boolean
  end
end
