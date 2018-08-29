class Resourse
  # model custom per creare form e salvare più model nella stessa chiamata

  include ActiveModel::Model

  attr_accessor :attachment, :user, :course_id, :tags, :document

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      course = Course.find(course_id)

      @document = Document.create!(file: attachment, user: user, course: course, file_name: attachment.original_filename)

      if !tags.nil?
        tags.each do |tag|
          if tag['id'].blank?
            @document.tags.create!(name: tag['name'], user: user)
          else
            tagIn = Tag.find(tag['id'])
            DocumentTag.create!(document: @document, tag: tagIn)
          end
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