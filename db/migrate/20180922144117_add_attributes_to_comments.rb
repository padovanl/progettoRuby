class AddAttributesToComments < ActiveRecord::Migration[5.2]
  def change
    add_reference :comments, :course, foreign_key: true, index: true
  end
end
