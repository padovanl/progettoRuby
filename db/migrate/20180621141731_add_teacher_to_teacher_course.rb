class AddTeacherToTeacherCourse < ActiveRecord::Migration[5.2]
  def change
    add_reference :teacher_courses, :teachers, foreign_key: true
  end
end
