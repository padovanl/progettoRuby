class Post < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course
  has_many :comments, :dependent => :destroy
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, :dependent => :destroy
  has_many :documents, through: :document_posts, :dependent => :destroy

  # un post può essere votato da più utenti
  has_many :upvotes, dependent: :destroy, :dependent => :destroy
  has_many :upvoters, through: :upvotes, dependent: :destroy, class_name: 'User', source: :upvoter

  # validations
  validates_presence_of :message, :user


  # Configure by calling
  # `reduces(some_initial_scope, filters: [an, array, of, lambdas])`
  #
  # Filters can use any methods your initial dataset understands,
  # in this case Artist class methods and scopes
  reduces self.all, filters: [
      ->(course_id:) { where course_id: course_id },
      ->(user_id:) { where user_id: user_id },
      ->(upvoter_id:) { joins(:upvotes).where("upvotes.upvoter_id = ?", upvoter_id) }
  ]

  scope :current_user_post,   ->(user, id){ where(user_id: user.id, id: id) }
=begin
  scope :upvotes_of_user, -> (location_id) { where location_id: location_id }upvotes_of_user
  scope :with_comments_count, -> { joins('left outer join comments on posts.id = comments.post_id')
                           .select('posts.*, count(comments.id) as comments_count').group('posts.id').order(created_at: :asc) }
=end
end
