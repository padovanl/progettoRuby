class CreateReps < ActiveRecord::Migration[5.2]
  def change
    create_table :reps do |t|
      t.string :description
      t.timestamps
    end
  end
end
