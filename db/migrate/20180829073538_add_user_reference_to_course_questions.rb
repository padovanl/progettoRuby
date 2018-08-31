class AddUserReferenceToCourseQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :course_questions, :user, foreign_key: true
  end
end
