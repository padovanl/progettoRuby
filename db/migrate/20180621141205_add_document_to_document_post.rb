class AddDocumentToDocumentPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_posts, :document, foreign_key: true
  end
end
