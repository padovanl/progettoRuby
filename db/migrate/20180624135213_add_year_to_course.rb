class AddYearToCourse < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :year, :integer
  end
end
