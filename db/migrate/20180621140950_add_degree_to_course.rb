class AddDegreeToCourse < ActiveRecord::Migration[5.2]
  def change
    add_reference :courses, :degree_course, foreign_key: true
  end
end
