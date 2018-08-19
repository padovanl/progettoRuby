class Course < ApplicationRecord
  has_many :reps
  belongs_to :degree_course
<<<<<<< HEAD
  has_many :course_tips
  has_many :course_questions
  has_many :posts
  has_many :user_courses
  has_many :teacher_courses


  def self.search(query)
    where("name like ?", "%#{query}%")
  end

=======
  has_many :course_tips, :dependent => :destroy
  has_many :course_questions, :dependent => :destroy
  has_many :posts, :dependent => :destroy
  has_many :user_courses, :dependent => :destroy
  has_many :teacher_courses, :dependent => :destroy
>>>>>>> 36ae37c673c06a6db5dc00766f2d708b826bbe2f
end
