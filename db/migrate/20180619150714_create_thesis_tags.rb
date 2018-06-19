class CreateThesisTags < ActiveRecord::Migration[5.2]
  def change
    create_table :thesis_tags do |t|

      t.timestamps
    end
  end
end
