class CreateUserReports < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reports do |t|

      t.timestamps
    end
  end
end
