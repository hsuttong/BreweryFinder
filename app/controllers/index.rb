GOOG_KEY = ENV['GOOGLE_API_KEY']

get '/' do
  erb :index
end

post '/breweries' do
  # Do shit here to post to brewererydb api
  api = Brewerydb::Client.new
  @city = params[:city]
  @breweries = api.brew_by_city(@city)
  @city_brew = []
  puts "#####################################"
  pp params[:city]
  pp @breweries
  if @breweries["data"]
    @breweries["data"].each do |brew|
      lat = brew["latitude"]
      long = brew["longitude"]
      name = brew["brewery"]["name"]
      @city_brew << [name, lat, long]
    end
  else
    puts "No Breweries, fix return"
  end

  content_type :json
  return {breweries: @city_brew}.to_json
end

# get '/maps' do
#   GOOG_KEY = ENV['GOOGLE_API_KEY']
#   erb :map
# end
