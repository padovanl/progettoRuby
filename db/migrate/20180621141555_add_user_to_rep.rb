class AddUserToRep < ActiveRecord::Migration[5.2]
  def change
    add_reference :reps, :user, foreign_key: true
  end
end
