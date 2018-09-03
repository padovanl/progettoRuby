class CourseQuestion < ApplicationRecord
  belongs_to :course
  belongs_to :user
  has_many :frequency_questions, :dependent => :destroy
end
