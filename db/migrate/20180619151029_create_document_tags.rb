class CreateDocumentTags < ActiveRecord::Migration[5.2]
  def change
    create_table :document_tags do |t|
      t.timestamps
    end
  end
end
