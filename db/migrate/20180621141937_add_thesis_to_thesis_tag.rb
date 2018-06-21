class AddThesisToThesisTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :thesis_tags, :thesis, foreign_key: true
  end
end
