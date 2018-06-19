class DocumentPost < ApplicationRecord
  belongs_to :post
  belongs_to :document
end
