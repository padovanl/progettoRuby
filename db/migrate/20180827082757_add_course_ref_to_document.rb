class AddCourseRefToDocument < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :course, foreign_key: true, index: true
  end
end
