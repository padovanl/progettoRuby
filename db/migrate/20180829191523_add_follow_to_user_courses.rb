class AddFollowToUserCourses < ActiveRecord::Migration[5.2]
  def change
    #se crea un record, significa che lo sto seguendo
    add_column :user_courses, :follow, :boolean, default: true
  end
end
