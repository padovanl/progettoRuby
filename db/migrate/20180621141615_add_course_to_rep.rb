class AddCourseToRep < ActiveRecord::Migration[5.2]
  def change
    add_reference :reps, :courses, foreign_key: true
  end
end
