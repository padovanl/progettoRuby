class DegreeCourse < ApplicationRecord
  has_many :courses, :dependent => :destroy

  validates_presence_of :name
  validates_presence_of :tipo
  validates_inclusion_of :tipo, :in => ["Triennale", "Magistrale"]

  def self.search_degrees(degree)
    if degree
      where('tipo LIKE ? ', "%#{degree}%")
    else
      select('tipo, count(name) AS name').group('tipo')
    end
  end
end
