class AddUserReferenceToCourseTips < ActiveRecord::Migration[5.2]
  def change
    add_reference :course_tips, :user, foreign_key: true
  end
end
