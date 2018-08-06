require './config/environment'
require './app/models/sample_model'
require 'httparty'

class ApplicationController < Sinatra::Base
  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get '/' do
    return erb :index
  end
  get '/supernovae' do
    return erb :supernovae
  end
 get '/kilonovae' do
    return erb :kilonovae
  end
end