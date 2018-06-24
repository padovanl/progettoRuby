class AddTeacherToThesis < ActiveRecord::Migration[5.2]
  def change
    add_reference :theses, :teacher, foreign_key: true
  end
end
