class TeacherCourse < ApplicationRecord
  belongs_to :teacher
  belongs_to :course

  def self.search(query)
    where("data like ?", "%#{query}%")
  end
end
