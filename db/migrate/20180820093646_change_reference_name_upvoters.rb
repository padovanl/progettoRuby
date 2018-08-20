class ChangeReferenceNameUpvoters < ActiveRecord::Migration[5.2]
  def change
    drop_table :upvotes

    create_table :upvotes do |t|
      t.belongs_to :post, index: true
      t.belongs_to :upvoter, index: true, class_name: 'User'

      t.timestamps
    end
  end
end
