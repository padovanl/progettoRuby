class AddCourseToRep < ActiveRecord::Migration[5.2]
  def change
    add_reference :reps, :course, foreign_key: true
  end
end
