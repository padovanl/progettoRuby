class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at
  has_many :comments
  has_many :documents
  belongs_to :user

  attribute :upvotes

  def upvoters
    object.upvotes.map do |ii|
      UpvoteSerializer.new(ii)
    end
  end

end
