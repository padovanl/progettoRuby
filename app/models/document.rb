class Document < ApplicationRecord
  extend Rack::Reducer

  has_many :document_tags, dependent: :destroy

  belongs_to :user
  belongs_to :course
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, dependent: :destroy
  has_many :posts, through: :document_posts

  has_many :document_tags, dependent: :destroy
  has_many :tags, through: :document_tags

  has_one_attached :file

  # validations
  validates_presence_of :user, :course, :file_name

  reduces self.all, filters: [
      ->(course_id:) { where course_id: course_id },
      ->(user_id:) { where user_id: user_id },
      ->(search_string:) { left_outer_joins(:tags).where('lower(tags.name) similar to ? OR lower(file_name) similar to ?',
                                              "%(#{search_string.downcase.split.join('|')})%",
                                              "%(#{search_string.downcase.split.join('|')})%") }
  ]

  scope :current_user_document,   ->(user, id){ where(user_id: user.id, id: id) }
end
