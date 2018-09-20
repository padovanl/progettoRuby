class CourseTip < ApplicationRecord
  belongs_to :course
  belongs_to :user

  validates_presence_of :tip
end
