class AddCourseToUserCourse < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_courses, :courses, foreign_key: true
  end
end
