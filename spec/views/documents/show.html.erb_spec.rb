require 'rails_helper'

RSpec.describe "documents/show", type: :view do
  before(:each) do
    @document = assign(:document, Document.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
