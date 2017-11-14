class Project < ApplicationRecord
  if use_wantedly_database?
    default_scope { where(use_video: false, deleted_at: nil, format_cd: 0) }

    self.ignored_columns = %w[
      application_qualification
      format_cd
      deleted_at
      full_company_video_id
      digest_company_video_id
      use_video
      secret_candidate_count
      writing_support
      profile_item_bitflags
      impression_count
      click_count
      rocketstart_strength
      moderation_checked
      category_cd
      moderation_state_cd
      plan_cd
      last_edited_at
    ]
  end

  STATES = [:draft, :published, :visible_paused, :hidden_paused, :visible_terminated, :hidden_terminated, :canceled]
  as_enum :state, STATES, prefix: true
  CATEGORIES = [:normal, :secret, :website, :company]
  as_enum :category, CATEGORIES, prefix: true

  scope :normal, -> { category_normals }
  scope :listed, -> { where(state_cd: Project.states[:published]).normal }

  belongs_to :company
  has_one :image, -> { where(name: 'image') }, class_name: "Image", as: :imageable

  def why_description; self[:why_description] || self.company.why_description end
  def what_description; self[:what_description] || self.company.what_description end
  def how_description; self[:how_description] || self.company.how_description end

  def self.related_of(id)
    Project.find(id).company.projects.listed
  end
end
