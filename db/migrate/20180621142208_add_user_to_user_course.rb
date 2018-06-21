class AddUserToUserCourse < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_courses, :users, foreign_key: true
  end
end
