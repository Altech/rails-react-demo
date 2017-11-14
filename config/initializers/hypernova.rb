require 'hypernova'

Hypernova.configure do |config|
  config.http_adapter = :httpclient
  config.host = "localhost"
  config.port = 3030            # The port where the node service is listening
  config.scheme = :http
end
