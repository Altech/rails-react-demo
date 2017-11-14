class User < ApplicationRecord
  if use_wantedly_database?
    default_scope { where(registered: true, deleted: false) }

    self.ignored_columns = %w[
      facebook_uid
      registered
      deleted
    ]
  end

  def name
    case I18n.locale
    when :ja
      name_ja
    when :en
      name_en
    else
      name_ja || name_en
    end
  end
end
