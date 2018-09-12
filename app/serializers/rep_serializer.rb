class RepSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at, :user_id, :course_id, :offer, :user_competence, :price_hours, :place, :home_service, :week_days
  belongs_to :user
  belongs_to :course
end