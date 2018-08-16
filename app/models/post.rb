class Post < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course
  has_many :comments
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts
  has_many :documents, through: :document_posts

  # un post può essere votato da più utenti
  has_many :upvotes, dependent: :destroy
  has_many :users, through: :upvotes

  # validations
  validates_presence_of :message


  # Configure by calling
  # `reduces(some_initial_scope, filters: [an, array, of, lambdas])`
  #
  # Filters can use any methods your initial dataset understands,
  # in this case Artist class methods and scopes
  reduces self.all, filters: [
      ->(course_id:) { where course_id: course_id },
      ->(user_id:) { where user_id: user_id },
      ->(upvoter_id:) { joins(:upvotes).where("upvotes.user_id = ?", upvoter_id) }
  ]

=begin
  scope :upvotes_of_user, -> (location_id) { where location_id: location_id }upvotes_of_user
  scope :with_comments_count, -> { joins('left outer join comments on posts.id = comments.post_id')
                           .select('posts.*, count(comments.id) as comments_count').group('posts.id').order(created_at: :asc) }
=end
end
