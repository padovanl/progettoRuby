class AddTagToDocumentTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_tags, :tag, foreign_key: true
  end
end
