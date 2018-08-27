class Publication
  # model custom per creare form e salvare più model nella stessa chiamata

  include ActiveModel::Model

  attr_accessor :message, :attachments, :user, :post, :course_id

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      course = Course.find(course_id)
      @post = Post.create!(message: message, user: user, course: course)

      if !attachments.nil?
        attachments.each do |file|
          @post.documents.create!(file: file, user: user, course: course)
        end
      end
    end

    true
    rescue ActiveRecord::StatementInvalid => e
      # Handle exception that caused the transaction to fail
      # e.message and e.cause.message can be helpful
      errors.add(:base, e.message)

    false
  end
end