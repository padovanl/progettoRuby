class Post < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :comments
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts
  has_many :documents, through: :document_posts

  # validations
  validates_presence_of :message

  scope :posts_of_a_course, -> (course_id) { where("course_id = ?", course_id)}
  scope :with_comments_count, -> { joins('left outer join comments on posts.id = comments.post_id')
                           .select('posts.*, count(comments.id) as comments_count').group('posts.id').order(created_at: :desc) }

end
