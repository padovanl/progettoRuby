require "rails_helper"

RSpec.describe CommentMailer, type: :mailer do
  describe "new_comment" do
    let(:rep) {Rep.first}
    let(:mail) { CommentMailer.new_comment }

    it "renders the headers" do
      expect(mail.subject).to eq("Ripetizione")
      expect(mail.to).to eq([rep.user.email])
      expect(mail.from).to eq(["neroplay@company.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(rep.description)
    end
  end

end
