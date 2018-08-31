class AddStatisticalDetailsToUserCourses < ActiveRecord::Migration[5.2]
  def change
    add_column :user_courses, :passed, :boolean
    add_column :user_courses, :estimate_difficulty, :integer
    add_column :user_courses, :material_quality, :integer
    add_column :user_courses, :explanation, :integer
    add_column :user_courses, :average_attempts, :integer
    add_column :user_courses, :average_days, :integer
  end
end
