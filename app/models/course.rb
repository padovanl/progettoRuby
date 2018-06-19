class Course < ApplicationRecord
  has_many :reps
  belongs_to :degree_course
  has_many :course_tips
  has_many :course_questions
  has_many :posts
end
