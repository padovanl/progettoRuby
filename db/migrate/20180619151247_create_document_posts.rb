class CreateDocumentPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :document_posts do |t|

      t.timestamps
    end
  end
end
