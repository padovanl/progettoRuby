class CreateCourseTips < ActiveRecord::Migration[5.2]
  def change
    create_table :course_tips do |t|
      t.string :tip
      t.timestamps
    end
  end
end
