class Course < ApplicationRecord
  has_many :reps
  belongs_to :degree_course
  has_many :course_tips, :dependent => :destroy
  has_many :course_questions, :dependent => :destroy
  has_many :posts, :dependent => :destroy
  has_many :user_courses, :dependent => :destroy
  has_many :teacher_courses, :dependent => :destroy
end
