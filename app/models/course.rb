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



  validates_presence_of :name, message: "The name should be present"
  validates_numericality_of :year, message: "The year should be an integer"
  validates_inclusion_of :year, :in => [1,2], message: "The year is in [1,2]"
  validates_format_of :name, with: /\A[a-zA-Z-àèéìòù .,]+\z/, :on => :create, message: "Only allows letters"


  def self.search_courses_not_followed(degreen, degreet, category, query, current_user_id)

    if query and category
      case category
      when 'Course' #nome del corso
        includes(:degree_course, :teachers => :teacher_courses)
            .where("courses.name ILIKE ?", "%#{query}%")
            .myReferences()
            .not_follow(current_user_id)

      when 'Data'
        includes(:degree_course, :teacher_courses,:teachers => :teacher_courses)
            .myReferences()
            .where("teacher_courses.year LIKE ?", "%#{query}%")
            .not_follow(current_user_id)

      when 'Teacher'
        includes(:degree_course, :teachers => :teacher_courses)
            .order(name: :desc)
            .references(:teachers)
            .where(
            "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
            "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
            .not_follow(current_user_id)
            .references(:teacher_courses).select(:year).order(:year).reverse_order.limit(1)


      when  'Year'
        includes(:degree_course, :teachers => :teacher_courses)
            .where("courses.year =?", "#{query}")
            .myReferences()
            .not_follow(current_user_id)
      else
        return "ERRORE (eugenio) eager_load model t_c"
      end

    elsif degreen
      eager_load( :degree_course,:teachers => :teacher_courses)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}")
          .myReferences()
          .not_follow(current_user_id)
    else
      includes(:degree_course,  :teacher_courses, :teachers)#.order('teacher_courses.year desc').limit(1) -> nn va
          .myReferences()
          .not_follow(current_user_id)

    end

  end






  def self.search_courses_followed(degreen, degreet, category, query, current_user_id)

    if query and category
      case category
      when 'Course' #nome del corso
        includes(:degree_course, :teachers => :teacher_courses)
            .where("courses.name ILIKE ?", "%#{query}%")
            .myReferences()
            .follow(current_user_id)

      when 'Data'
        includes(:degree_course, :teacher_courses,:teachers => :teacher_courses)
            .myReferences()
            .where("teacher_courses.year LIKE ?", "%#{query}%")
            .follow(current_user_id)

      when 'Teacher'
        includes(:degree_course, :teachers => :teacher_courses)
            .order(name: :desc)
            .references(:teachers)
            .where(
                "teachers.surname ILIKE ? or
                 teachers.name ILIKE ? or
                (teachers.name || ' ' || teachers.surname) ILIKE ? or
                (teachers.surname || ' ' || teachers.name) ILIKE ?",
                "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%")
            .follow(current_user_id)
            .references(:teacher_courses).select(:year).order(:year).reverse_order.limit(1)


      when  'Year'
        includes(:degree_course, :teachers => :teacher_courses)
            .where("courses.year =?", "#{query}")
            .myReferences()
            .follow(current_user_id)
      else
        return "ERRORE (eugenio) eager_load model t_c"
      end

    elsif degreen
      eager_load( :degree_course,:teachers => :teacher_courses)
          .where('degree_courses.name LIKE ? AND degree_courses.tipo LIKE ?', "#{degreen}", "#{degreet}")
          .myReferences()
          .follow(current_user_id)
    else
      includes(:degree_course,  :teacher_courses, :teachers)#.order('teacher_courses.year desc').limit(1) -> nn va
          .myReferences()
          .follow(current_user_id)

    end

  end




  scope :follow, -> (current_user_id) {
    references(:courses)
        .where(courses: {id: UserCourse.select(:course_id)
                                     .where(user_id: current_user_id)
                                     .where(follow: true)
                                     .group(:course_id)
    })
  }

  scope :not_follow, -> (current_user_id) {
    references(:courses)
        .where.not(courses: {id: UserCourse.select(:course_id)
                                     .where(user_id: current_user_id)
                                     .where(follow: true)
                                     .group(:course_id)
    })
  }

  scope :myReferences, -> () {
    references(:courses).select(:id, :name, :year).order(:name)
    .references(:teachers).select(:name, :surname, :link_cv)
    .references(:teacher_courses).select(:year).order(:year).limit(1)
  }


  def self.get_names
    select(:name).order(:name)
  end
end
