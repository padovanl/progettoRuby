class DegreeCourse < ApplicationRecord
  has_many :courses, :dependent => :destroy


  def self.search_degrees(degree)
    if degree
      where('tipo LIKE ? ', "%#{degree}%")
    else
      select('tipo, count(name) AS name').group('tipo')
    end
  end
end
