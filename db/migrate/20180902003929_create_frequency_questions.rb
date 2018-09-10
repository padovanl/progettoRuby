class CreateFrequencyQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :frequency_questions do |t|

      t.timestamps
    end
  end
end
