class Teacher < ApplicationRecord
  has_many :teacher_courses, :dependent => :destroy
  has_many :courses, through: :teacher_courses
  has_many :theses, :dependent => :destroy

  # validations
  validates_presence_of :name
  validates_presence_of :surname
  validates_presence_of :link_cv

  def self.get_names_complete
    select(:id, :surname,:name, :link_cv,  :created_at, :updated_at).order(:surname)
  end
end
