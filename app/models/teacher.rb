class Teacher < ApplicationRecord
  has_many :teacher_courses, :dependent => :destroy
  has_many :courses, through: :teacher_courses
  has_many :theses, :dependent => :destroy
end
