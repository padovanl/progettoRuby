class AddAttributesToUserReports < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_reports, :user, foreign_key: true
    add_reference :user_reports, :report, foreign_key: true
    add_column :user_reports, :reason, :string #motivazione del report
  end
end
