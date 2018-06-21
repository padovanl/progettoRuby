class AddDocumentToDocumentTag < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_tags, :documents, foreign_key: true
  end
end
