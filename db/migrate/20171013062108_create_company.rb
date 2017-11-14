class CreateCompany < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.references  :user, index: true
      t.string  :name
      t.string  :company_name, index: true
      t.string  :address_prefix
      t.string  :address_suffix
      t.float   :latitude
      t.float   :longitude
      t.string  :country_cd, limit: 2, default: "JP", null: false
      t.string  :logo
      t.string  :founder
      t.date    :founded_on
      t.integer :capital
      t.integer :payroll_number
      t.string  :url
      t.string  :origin
      t.text    :why_description
      t.text    :what_description
      t.text    :how_descriptiony

      t.timestamps
    end
  end
end
