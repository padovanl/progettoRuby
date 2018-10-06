class TeacherCourseReducedSerializer < ActiveModel::Serializer
  attributes  :year
  belongs_to :teacher

end
