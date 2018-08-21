class TeacherCourse < ApplicationRecord
  belongs_to :teacher
  belongs_to :course

  def self.search(query)
    where("data like ?", "%#{query}%")
  end


  #scope :with_name_like, lambda { |name|
   # includes(:course, :teacher).where('courses.name LIKE ?', "%#{name}%")
  #}
end
