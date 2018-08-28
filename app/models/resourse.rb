class Resourse
  # model custom per creare form e salvare più model nella stessa chiamata

  include ActiveModel::Model

  attr_accessor :attachment, :user, :course_id, :tags, :document

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      course = Course.find(course_id)
      @document = Document.create!(file: attachment, user: user, course: course)

      if !tags.nil?
        tags.each do |tag|
          @document.tags.create!(name: tag, user: user)
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