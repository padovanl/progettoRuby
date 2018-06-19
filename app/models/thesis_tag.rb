class ThesisTag < ApplicationRecord
  belongs_to :tag
  belongs_to :thesis
end
