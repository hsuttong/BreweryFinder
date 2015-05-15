get '/' do
  api = Brewerydb::Client.new
  #Brewerydb::Client::KEY.inspect # Check and see if you have a API key.
  erb :index
end


post '/breweries' do
  #do shit here to post to brewererydb api
  api = Brewerydb::Client.new
  @breweries = api.brew_by_city(params[:city])
  @city_brew = []
  @breweries["data"].each do |brew|
    lat = brew["latitude"]
    long = brew["latitude"]
    name = brew["brewery"]["name"]
    @city_brew << [name, lat, long]

    puts "#{lat}, #{long}, #{name}"

  end
  binding.pry
  p @city_brew

  erb :index
end

get '/maps' do
  GOOG_KEY = ENV['GOOGLE_API_KEY']
  erb :map
end

