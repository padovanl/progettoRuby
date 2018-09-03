class AddCourseQuestionsReferenceToFrequencyQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :frequency_questions, :course_question, foreign_key: true
  end
end
