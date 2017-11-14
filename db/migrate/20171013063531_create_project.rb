class CreateProject < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.references  :company
      t.string   :title
      t.text     :description
      t.text     :why_description
      t.text     :what_description
      t.text     :how_description
      t.boolean  :sync_description,  default: true,  null: false
      t.integer  :state_cd, default: 0, null: false
      t.datetime :published_at

      t.string   :looking_for
      t.string   :custom_looking_for
      t.integer  :hiring_type_bitflags,                  default: 0,     null: false
      t.text     :keywords

      t.text     :location
      t.text     :normalized_location
      t.string   :location_suffix,           limit: 255
      t.float    :latitude
      t.float    :longitude

      t.string   :country_cd,                limit: 2,   default: :JP,  null: false
      t.string   :locale,                    limit: 255

      t.boolean  :authorized,                            default: true
      t.boolean  :is_featured,                           default: false, null: false

      t.integer  :page_view,                             default: 0,     null: false
      t.integer  :unique_visitor,                        default: 0,     null: false
      t.integer  :candidate_count,                       default: 0,     null: false
      t.integer  :support_count,                         default: 0,     null: false
      t.integer  :monthly_support_count

      t.timestamps
    end
  end
end
