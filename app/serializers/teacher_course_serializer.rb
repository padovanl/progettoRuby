class TeacherCourseSerializer < ActiveModel::Serializer
  attributes :id, :year, :created_at, :updated_at, :teacher_id, :course_id
  belongs_to :teacher
  belongs_to :course
end
