class UserCourse < ApplicationRecord

  belongs_to :user
  belongs_to :course


  def self.first_update_or_create( course_id, user_id)
    user_course = UserCourse.where(:course_id => course_id, :user_id => user_id).first_or_create!
    if user_course.follow === false #se già c'era e quindi follow era uguale a false,lo setta a true
      user_course.follow = true
      user_course.save
    end
  end


  def self.update(course_id, user_id)
    user_course = UserCourse.where(:course_id => course_id, :user_id => user_id).first
    if !user_course.nil?
      user_course.follow = false
      user_course.save
    end
  end

end
