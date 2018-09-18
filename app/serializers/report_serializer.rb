class ReportSerializer < ActiveModel::Serializer
  attributes :id, :recipient_id, :actor_id, :action, :reportable_id, :reportable_type, :created_at, :updated_at, :read_at
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  belongs_to :actor, :foreign_key => :actor_id, class_name: "User"
  belongs_to :reportable, polymorphic: true

  attribute :course

  def course
    CourseSerializer.new(Course.find(object.reportable.course_id))
  end
end
