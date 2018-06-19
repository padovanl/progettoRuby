class Teacher < ApplicationRecord
  has_many :teacher_courses
  has_many :theses
end
