class ProjectSerializer < ApplicationSerializer
  attributes :id, :title, :published_at
  attributes :description, :why_description, :what_description, :how_description
  attributes :candidate_count, :monthly_support_count
  attribute(:canonical_path) { "/projects/#{object.id}" }
  attribute(:keywords) {
    object.keywords&.split(/\s*,\s*/)
  }
  attribute(:looking_for) {
    object.custom_looking_for.presence || object.looking_for
  }
  attribute(:page_view) { rand(10000) }
  attribute(:location) { "#{object.location}#{object.location_suffix}".presence }

  belongs_to :company
  has_one :image

  preload do
    attribute :why_description,  includes: :company
    attribute :what_description, includes: :company
    attribute :how_description,  includes: :company

    association :company
    association :image
  end
end
