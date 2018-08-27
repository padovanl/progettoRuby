class Document < ApplicationRecord
  has_many :document_tags, dependent: :destroy

  belongs_to :user
  belongs_to :course
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, dependent: :destroy
  has_many :posts, through: :document_posts

  has_many :document_tags
  has_many :tags, through: :document_tags

  has_one_attached :file

  # validations
  validates_presence_of :user

  reduces self.all, filters: [
      ->(course_id:) { where course_id: course_id },
      ->(user_id:) { where user_id: user_id },
      ->(upvoter_id:) { joins(:upvotes).where("upvotes.upvoter_id = ?", upvoter_id) },
      ->(comment_user_id:) { joins(:comments).where("comments.user_id = ?", comment_user_id) }
  ]

end
