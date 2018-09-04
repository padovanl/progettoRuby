class Course < ApplicationRecord
  has_many :reps, :dependent => :destroy
  belongs_to :degree_course

  has_many :course_tips, :dependent => :destroy
  has_many :course_questions, :dependent => :destroy
  has_many :posts, :dependent => :destroy
  has_many :user_courses, :dependent => :destroy
  has_many :teacher_courses, :dependent => :destroy
  has_many :teachers, through: :teacher_courses
  has_many :documents, :dependent => :destroy




  def self.search_courses_not_followed(degreen, degreet, category, query, current_user_id)

    if query and category
      case category
      when 'Name' #del corso
        includes(:degree_course, :teachers => :teacher_courses).where("name ILIKE ?", "%#{query}%")
            .not_follow(current_user_id)
            .order(name: :desc)
      when 'Data'
        eager_load(:degree_course, :teachers => :teacher_courses).where("teacher_courses_teachers.year LIKE ?", "%#{query}%")
            .not_follow(current_user_id)
            .order(name: :desc)
      when 'Teacher'
        eager_load(:degree_course, :teachers => :teacher_courses).where(
            "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
            "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
            .not_follow(current_user_id)
            .order(name: :desc)
      when  'Year'
        includes(:degree_course, :teachers => :teacher_courses).where("year =?", "#{query}")
            .not_follow(current_user_id)
            .order(name: :desc)
      else
        return "ERRORE (eugenio) eager_load model t_c"
      end

    elsif degreen
      eager_load( :degree_course, :teachers => :teacher_courses)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}")
          .not_follow(current_user_id)
          .order(year: :desc)
    else
      includes(:degree_course,  :user_courses, :teacher_courses, :teachers => :teacher_courses)
      .references(:teachers).select(:name, :surname, :link_cv)
      .references(:courses).select(:id, :name, :year)
          .not_follow(current_user_id)
          .order(name: :desc)
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


  def self.search(query)
    if query
      where("name like ?", "%#{query}%")
    else
      all
    end
  end
end
