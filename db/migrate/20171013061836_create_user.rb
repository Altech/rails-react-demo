class CreateUser < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string "name_en"
      t.string "name_ja"
    end
  end
end
