class AddTypeToDegreeCourse < ActiveRecord::Migration[5.2]
  def change
    add_column :degree_courses, :tipo, :string
  end
end
