json.extract! post, :id, :titolo, :messaggio, :created_at, :updated_at
json.url post_url(post, format: :json)
