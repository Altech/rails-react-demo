module ApplicationHelper
  def stylesheet_link_tag_from_manifest(name, **options)
    if Rails.env.development?
      begin
        # Note(miyashiro): If webpack-dev-server is running, disable to insert link tag
        # https://github.com/rails/webpacker/blob/5d45278e99d25f8b1e98687ba3491720cc73f1bb/lib/webpacker/dev_server.rb#L8-L13
        Socket.tcp('localhost', 9000, connect_timeout: 1).close
        return nil
      rescue Errno::ECONNREFUSED, NoMethodError
        nil
      end
    end
    ActionController::Base.helpers.stylesheet_link_tag_from_manifest(name, **options)
  end
end
