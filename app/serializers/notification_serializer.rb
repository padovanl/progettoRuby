class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :recipient_id, :actor_id, :action, :notifiable_id, :notifiable_type, :updated_at, :read_at
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  belongs_to :actor, :foreign_key => :actor_id, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  attribute :course

  def course
    CourseSerializer.new(Course.find(object.notifiable.course_id))
  end
end
