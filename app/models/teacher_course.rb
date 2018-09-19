class TeacherCourse < ApplicationRecord
  belongs_to :teacher
  belongs_to :course

  validates_presence_of :year
  validates :year, format: { with: /[0-9]{4}-[0-9]{4}/, message: "Il formato deve essere AAAA-AAAA" }


  def self.search(query)
    if query
      where("data like ?", "%#{query}%")
    else
      all
    end
  end


  def self.search_courses_not_followed(degreen, degreet, category, query, current_user_id)

    if query and category
      case category
      when 'Name'
        eager_load({course: :degree_course}, :teacher).where("courses.name ILIKE ?", "%#{query}%")
            .not_follow(current_user_id)
            .order(year: :desc)
      when 'Data'
        eager_load({course: :degree_course}, :teacher).where("teacher_courses.year LIKE ?", "%#{query}%")
            .not_follow(current_user_id)
            .order("courses.name desc")
      when 'Teacher'
        eager_load({course: :degree_course}, :teacher).where(
                "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
                 "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
            .references(:teacher)
            .not_follow(current_user_id)
            .order(year: :desc)
      when  'Year'
        eager_load({course: :degree_course}, :teacher).where("courses.year =?", "#{query}")
            .not_follow(current_user_id)
            .order(year: :desc)
      else
        return "ERRORE (eugenio) eager_load model t_c"
      end

    elsif degreen
      eager_load({course: :degree_course}, :teacher)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}")
          .not_follow(current_user_id)
          .order(year: :desc)
    else
      includes({course: :degree_course}, {course: :user_courses}, :teacher)
      .not_follow(current_user_id)
      .order(year: :desc)
    end

  end


  def self.search_courses_followed(degreen, degreet, category, query, current_user_id)

    if query and category
      case category
      when 'Name'
        eager_load({course: :degree_course}, :teacher).where("courses.name ILIKE ?", "%#{query}%")
            .follow(current_user_id)
            .order(year: :desc)
      when 'Data'
        eager_load({course: :degree_course}, :teacher).where("teacher_courses.year LIKE ?", "%#{query}%")
            .follow(current_user_id)
            .order("courses.name desc")
      when 'Teacher'
        eager_load({course: :degree_course}, :teacher).where(
            "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
            "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
            .references(:teacher)
            .follow(current_user_id)
            .order(year: :desc)
      when  'Year'
        eager_load({course: :degree_course}, :teacher).where("courses.year =?", "#{query}")
            .follow(current_user_id)
            .order(year: :desc)
      else
        return "ERRORE (eugenio) eager_load model t_c"
      end

    elsif degreen
      eager_load({course: :degree_course}, :teacher)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}")
          .follow(current_user_id)
          .order(year: :desc)
    else
      includes({course: :degree_course}, {course: :user_courses}, :teacher)
          .follow(current_user_id)
          .order(year: :desc)
    end

  end


  scope :follow, -> (current_user_id) {
    references(:user_courses)
        .where(user_courses: {user_id:  current_user_id})
  }

  scope :not_follow, -> (current_user_id) {
    references(:courses)
      .where.not(courses: {id: UserCourse.select(:course_id)
                             .where(user_id: current_user_id)
                             .where(follow: true)
                             .group(:course_id)
                          })
  }


  #scope :with_name_like, lambda { |name|
   # includes(:course, :teacher).where('courses.name LIKE ?', "%#{name}%")
  #}
end
