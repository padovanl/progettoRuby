class AddCourseToPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :courses, foreign_key: true
  end
end
