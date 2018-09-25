class CourseTip < ApplicationRecord
  belongs_to :course
  belongs_to :user

  validates_presence_of :tip

  scope :get_course_tips, -> (course_id) {
    where(:course_id => course_id).includes([:user, :course])
  }


end
