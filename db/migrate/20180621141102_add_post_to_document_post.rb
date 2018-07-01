class AddPostToDocumentPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_posts, :post, foreign_key: true
  end
end
