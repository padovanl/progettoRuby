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


  def self.search_course_teacher(degreen, degreet, category, query)
    if query and category

      case category
      when 'Name'
        eager_load({course: :degree_course}, :teacher).order(year: :desc).where("courses.name ILIKE ?", "%#{query}%")
      when 'Year'
        eager_load({course: :degree_course}, :teacher).order("courses.name desc").where("teacher_courses.year LIKE ?", "%#{query}%")
      when 'Teacher'
        eager_load({course: :degree_course}, :teacher).order(year: :desc).where(
                "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
                 "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
        .references(:teacher)
      when  'Module'
        eager_load({course: :degree_course}, :teacher).order(year: :desc).where("courses.year =?", "#{query}")
      else
        return "ERRORE eager_load model t_c"
      end

    elsif degreen
      eager_load({course: :degree_course}, :teacher)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}").order(year: :desc)
    else
      includes({course: :degree_course}, :teacher).order(year: :desc)
    end
  end





  #scope :with_name_like, lambda { |name|
   # includes(:course, :teacher).where('courses.name LIKE ?', "%#{name}%")
  #}
end
