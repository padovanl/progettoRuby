class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :year, :current_teacher, :degreen, :degreet

  def current_teacher
    Course.get_current_teacher(self.object.id)
  end

  def degreen
    self.object.degree_course.name
  end

  def degreet
    self.object.degree_course.tipo
   end
end
