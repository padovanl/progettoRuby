class AddUserRefToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_reference :documents, :user, foreign_key: true, index: true
  end
end
