class DegreeCourse < ApplicationRecord
  has_many :courses, :dependent => :destroy
end
