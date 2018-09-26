class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :surname, :link_cv, :created_at, :updated_at
  has_many :teacher_courses, :dependent => :destroy
  has_many :courses, through: :teacher_courses
  has_many :theses, :dependent => :destroy
end
