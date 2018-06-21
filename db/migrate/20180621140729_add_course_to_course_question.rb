class AddCourseToCourseQuestion < ActiveRecord::Migration[5.2]
  def change
    add_reference :course_questions, :course, foreign_key: true
  end
end
