class UserReportSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :report_id, :created_at, :updated_at, :reason
  belongs_to :report
  belongs_to :user

  attribute :user_of_report

  def user_of_report
      UserSerializer.new(User.find(object.user_id))
  end

end
