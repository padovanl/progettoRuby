class AddTeacherToThesis < ActiveRecord::Migration[5.2]
  def change
    add_reference :theses, :teachers, foreign_key: true
  end
end
