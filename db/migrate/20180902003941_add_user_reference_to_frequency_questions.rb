class AddUserReferenceToFrequencyQuestions < ActiveRecord::Migration[5.2]
  def change
    add_reference :frequency_questions, :user, foreign_key: true
  end
end
