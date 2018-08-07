require 'rails_helper'

RSpec.describe "documents/index", type: :view do
  before(:each) do
    assign(:documents, [
      Document.create!(),
      Document.create!()
    ])
  end

  it "renders a list of documents" do
    render
  end
end
