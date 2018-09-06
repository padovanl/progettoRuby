class AddParamsToReps < ActiveRecord::Migration[5.2]
  def change
    add_column :reps, :type, :boolean, null: false
    add_column :reps, :user_competence, :string
    add_column :reps, :price_hours, :decimal, precision: 6, scale: 2, null: false #999.999,22
    add_column :reps, :place, :string
    add_column :reps, :home_service, :boolean
    add_column :reps, :week_days, :string
  end

end

