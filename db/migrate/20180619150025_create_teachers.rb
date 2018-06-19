class CreateTeachers < ActiveRecord::Migration[5.2]
  def change
    create_table :teachers do |t|
      t.string :name
      t.string :surname
      t.string :link_cv
      t.timestamps
    end
  end
end
