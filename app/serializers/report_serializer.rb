class ReportSerializer < ActiveModel::Serializer
  attributes :id, :action, :reportable_id, :reportable_type, :created_at, :updated_at, :read_at
  has_many :user_reports, :dependent => :destroy
  has_many :users, through: :user_reports, :dependent => :destroy
  belongs_to :reportable, polymorphic: true

  attribute :course

  def course
      CourseSerializer.new(Course.find(object.reportable.course_id))
  end
end
