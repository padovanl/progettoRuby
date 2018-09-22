class UserCourse < ApplicationRecord

  belongs_to :user
  belongs_to :course


  def self.first_update_or_create( params, user_id)
    user_course = UserCourse.where(:course_id => params[:course_id], :user_id => user_id).first_or_create!
    #non va più il default, comunque o già esisteva ed era false, o era null, sempre true deve essere
    user_course.follow = true
    user_course.save
    return user_course
  end


  def self.update(course_id, user_id)
    user_course = UserCourse.where(:course_id => course_id, :user_id => user_id).first
    if !user_course.nil?
      user_course.follow = false
      user_course.save
    end
  end

end
