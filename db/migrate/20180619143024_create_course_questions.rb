class CreateCourseQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :course_questions do |t|
      t.string :question
      t.integer :frequency
      t.timestamps
    end
  end
end
