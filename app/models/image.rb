class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  def url
    if import_url.present?
      import_url
    else
      "https://d2fde157oxqkl4.cloudfront.net/assets/images/#{self.id}/original/#{URI.encode(self.file_file_name)}?#{self.file_updated_at.to_i}"
    end
  end
end
