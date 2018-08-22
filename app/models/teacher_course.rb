class TeacherCourse < ApplicationRecord
  belongs_to :teacher
  belongs_to :course

  def self.search(query)
    if query
      where("data like ?", "%#{query}%")
    else
      all
    end
  end


  def self.search_course_teacher(category, query)
    if query and category

      case category
      when 'Name'
        eager_load(:course, :teacher).order(year: :desc).where("courses.name like ?", "%#{query}%")
      when 'Year'
        eager_load(:course, :teacher).order("courses.name desc").where("teacher_courses.year LIKE ?", "%#{query}%")
      when 'Teacher'
        eager_load(:course, :teacher).order(year: :desc).where("teachers.surname LIKE ?", "%#{query}%")
      when  'Module'
        eager_load(:course, :teacher).order(year: :desc).where("courses.year =?", "#{query}")
      else
        return "ERRORE eager_load model t_c"
      end

    else
      includes(:course, :teacher).order(year: :desc)
    end
  end





  #scope :with_name_like, lambda { |name|
   # includes(:course, :teacher).where('courses.name LIKE ?', "%#{name}%")
  #}
end
