class RemoveFrequencyFromCourseQuestions < ActiveRecord::Migration[5.2]
  def change
    remove_column :course_questions, :frequency, :integer
  end
end
