class AddCourseToCourseTip < ActiveRecord::Migration[5.2]
  def change
    add_reference :course_tips, :courses, foreign_key: true
  end
end
