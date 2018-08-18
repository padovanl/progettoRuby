class ChangeColumnNameTeacherCourses < ActiveRecord::Migration[5.2]
  def change
    rename_column :teacher_courses, :data, :year
  end
end
