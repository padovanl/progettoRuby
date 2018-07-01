class AddCourseToPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :course, foreign_key: true
  end
end
