module DocumentsHelper
  def docs_file_name_and_link(documents)
    @result = []
    documents.each do |document|
      @result << doc_file_name_and_link(document)
    end

    return @result
  end

  def doc_file_name_and_link(document)
    return {id: document.id, created_at: document.created_at, file_name: document.file.filename.to_s,
            link: Rails.application.routes.url_helpers.rails_blob_path(document.file, only_path: true)}
  end

  def format_time(time, format=:long, blank_message="&nbsp;")
    time.blank? ? blank_message : time.to_s(format)
  end
end
