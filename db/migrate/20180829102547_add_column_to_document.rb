class AddColumnToDocument < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :file_name, :string
  end
end
