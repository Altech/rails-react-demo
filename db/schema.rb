# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171013063531) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "company_name"
    t.string "address_prefix"
    t.string "address_suffix"
    t.float "latitude"
    t.float "longitude"
    t.string "country_cd", limit: 2, default: "JP", null: false
    t.string "logo"
    t.string "founder"
    t.date "founded_on"
    t.integer "capital"
    t.integer "payroll_number"
    t.string "url"
    t.string "origin"
    t.text "why_description"
    t.text "what_description"
    t.text "how_descriptiony"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_name"], name: "index_companies_on_company_name"
    t.index ["user_id"], name: "index_companies_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "company_id"
    t.string "title"
    t.text "description"
    t.text "why_description"
    t.text "what_description"
    t.text "how_description"
    t.boolean "sync_description", default: true, null: false
    t.integer "state_cd", default: 0, null: false
    t.datetime "published_at"
    t.string "looking_for"
    t.string "custom_looking_for"
    t.integer "hiring_type_bitflags", default: 0, null: false
    t.text "keywords"
    t.text "location"
    t.text "normalized_location"
    t.string "location_suffix", limit: 255
    t.float "latitude"
    t.float "longitude"
    t.string "country_cd", limit: 2, default: "JP", null: false
    t.string "locale", limit: 255
    t.boolean "authorized", default: true
    t.boolean "is_featured", default: false, null: false
    t.integer "page_view", default: 0, null: false
    t.integer "unique_visitor", default: 0, null: false
    t.integer "candidate_count", default: 0, null: false
    t.integer "support_count", default: 0, null: false
    t.integer "monthly_support_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_projects_on_company_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name_en"
    t.string "name_ja"
  end
end
