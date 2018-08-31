class Post < ApplicationRecord
  extend Rack::Reducer

  belongs_to :user
  belongs_to :course
  has_many :comments, dependent: :destroy
  # indico la tabella intermedia e quella finale per le 
  # associazioni molti a molti
  has_many :document_posts, :dependent => :destroy
  has_many :documents, through: :document_posts, :dependent => :destroy

  # un post può essere votato da più utenti
  has_many :upvotes, dependent: :destroy
  has_many :upvoters, through: :upvotes, dependent: :destroy, class_name: 'User', source: :upvoter

  # validations
  validates_presence_of :message, :user


  reduces self.all, filters: [
      ->(course_id:) { where course_id: course_id },
      ->(user_id:) { where user_id: user_id },
      ->(upvoter_id:) { joins(:upvotes).where("upvotes.upvoter_id = ?", upvoter_id) },
      ->(comment_user_id:) { left_outer_joins(:comments).where("comments.user_id = ?", comment_user_id) }
  ]

  scope :current_user_post,   ->(user, id){ where(user_id: user.id, id: id) }
end
