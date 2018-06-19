class CreateUserCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :user_courses do |t|
      t.integer :rating
      t.integer :course_rate
      t.timestamps
    end
  end
end
