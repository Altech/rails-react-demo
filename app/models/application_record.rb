class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.use_wantedly_database?
    ENV['DATABASE_NAME'] == 'wantedly' || ENV['DATABASE_NAME'] == 'wantedly_test'
  end
end
