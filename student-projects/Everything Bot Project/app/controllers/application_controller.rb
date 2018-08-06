require './config/environment'
require './app/models/model'
#3: shotgun -p $PORT -o $IP

class ApplicationController < Sinatra::Base
  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get '/' do
    return erb :index
  end
  post '/result' do
    @question=params["question"]
    @answer=interpret(@question)
    return erb :result
  end
end
