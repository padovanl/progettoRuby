class AddCourseToTeacherCourse < ActiveRecord::Migration[5.2]
  def change
    add_reference :teacher_courses, :courses, foreign_key: true
  end
end
