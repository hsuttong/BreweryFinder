module Brewerydb

  class Client
    include HTTParty

    KEY  = ENV['BREWERYDB_API_KEY']
    HOST = ENV['BREWERYDB_HOST']
    API_VERSION = "v2"

    def initialize
    end

    def brew_by_city(city)
      @beweries_city ||= get("/locations/", {"locality" => city})
    end

    # def comments(article_id)
    #   get("/articles/#{article_id}/comments")
    # end

    # def create_article(params)
    #   post('/articles', params)
    # end

    # def create_comment(article_id, params)
    #   post('/articles/#{article_id}/comments', params)
    # end


    private

    def get(path, params={})
      url = "#{HOST}/#{API_VERSION}#{path}"
      p url
      p params

      q = {"key" => KEY}.merge(params)

      HTTParty.get(url, {query: q}).parsed_response
    end

    # def post(path, params={})
    #   url = "#{HOST}/#{API_VERSION}#{path}"
    #   HTTParty.post(url, {
    #     body: params.to_json,
    #     headers:{"key" => KEY},
    #   }).parsed_response
    # end

  end

end
