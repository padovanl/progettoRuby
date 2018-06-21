class AddPostToDocumentPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :document_posts, :posts, foreign_key: true
  end
end
