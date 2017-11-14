class Company < ApplicationRecord
  if use_wantedly_database?
    default_scope { where(form: 0, deleted_at: nil) }

    self.ignored_columns = %w[
      phone
      map
      verified
      form
      deleted_at
      how_description
      featured_at
      zendesk_organization_id
      portfolio_description
      industry
      service_bitflags
      portfolio_score
      team_name
    ]
  end

  has_many :projects
  has_one :avatar, -> { where(name: 'avatar') }, class_name: "Image", as: :imageable
end
