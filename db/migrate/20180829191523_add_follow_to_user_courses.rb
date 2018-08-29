class AddFollowToUserCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :user_courses, :follow, :boolean
  end
end
