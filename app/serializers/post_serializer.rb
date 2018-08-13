class PostSerializer < ActiveModel::Serializer
  attributes :id, :message, :created_at
  has_many :comments
  has_many :documents
  belongs_to :user


=begin
  # has_many
  :estimates



  def estimates
    customized_estimates = []

    object.estimates.each do |estimate|
      # Assign object attributes (returns a hash)
      # ===========================================================
      custom_estimate = estimate.attributes


      # Custom nested and side-loaded attributes
      # ===========================================================
      # belongs_to
      custom_estimate[:project] = estimate.project.slice(:id, :name) # get only :id and :name for the project
      custom_estimate[:project_code] = estimate.project_code
      custom_estimate[:tax_type] = estimate.tax_type

      # has_many w/only specified attributes
      custom_estimate[:proposals] = estimate.proposals.collect{|proposal| proposal.slice(:id, :name, :updated_at)}

      # ===========================================================
      customized_estimates.push(custom_estimate)
    end


    return customized_estimates
  #end
=end
  class CommentSerializer < ActiveModel::Serializer
    attributes :content, :created_at
    belongs_to :user
  end
end
