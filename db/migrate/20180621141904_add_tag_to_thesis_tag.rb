class AddTagToThesisTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :thesis_tags, :tags, foreign_key: true
  end
end
