class FrequencyQuestion < ApplicationRecord
  belongs_to :user
  belongs_to :course_question
end
