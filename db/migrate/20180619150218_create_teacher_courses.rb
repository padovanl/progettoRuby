class CreateTeacherCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :teacher_courses do |t|
      t.string :data
      t.timestamps
    end
  end
end
