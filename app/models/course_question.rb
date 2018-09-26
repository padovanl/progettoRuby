class CourseQuestion < ApplicationRecord
  belongs_to :course
  belongs_to :user
  has_many :frequency_questions, :dependent => :destroy

  validates_presence_of :question

  scope :get_course_questions, -> (course_id) {
    where(:course_id => course_id)
  }

end
