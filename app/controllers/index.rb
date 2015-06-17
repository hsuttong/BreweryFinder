GOOG_KEY = ENV['GOOGLE_API_KEY']

get '/' do
  erb :index
end

post '/breweries' do
  # Do shit here to post to brewererydb api
  api = Brewerydb::Client.new
  @breweries = api.brew_by_city(params[:city])
  @city_brew = []
  @breweries["data"].each do |brew|
    lat = brew["latitude"]
    long = brew["longitude"]
    name = brew["brewery"]["name"]
    @city_brew << [name, lat, long]
  end

  #p @breweries["data"]
  p @city_brew
  content_type :json
  return {breweries: @city_brew}.to_json
end

# get '/maps' do
#   GOOG_KEY = ENV['GOOGLE_API_KEY']
#   erb :map
# end
