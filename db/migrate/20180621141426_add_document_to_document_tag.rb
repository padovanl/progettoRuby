class AddDocumentToDocumentTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_tags, :document, foreign_key: true
  end
end
