get '/' do
  api = Brewerydb::Client.new
  #Brewerydb::Client::KEY.inspect # Check and see if you have a API key.
  erb :index
end


post '/breweries' do
  #do shit here to post to brewererydb api
  api = Brewerydb::Client.new
  @breweries = api.brew_by_city(params[:city])
  erb :index
end

