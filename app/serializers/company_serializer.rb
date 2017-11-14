class CompanySerializer < ApplicationSerializer
  attributes :id, :name, :founded_on
  attribute(:canonical_path) { "/companies/#{object.company_name}" }

  has_one :avatar
  has_many :projects

  preload do
    association :avatar
    association :projects
  end
end
