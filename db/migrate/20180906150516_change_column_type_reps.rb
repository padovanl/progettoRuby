class ChangeColumnTypeReps < ActiveRecord::Migration[5.2]
  def change
    rename_column :reps, :type, :offer
  end
end
