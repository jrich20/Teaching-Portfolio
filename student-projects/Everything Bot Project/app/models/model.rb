require 'api-ai-ruby'
require 'httparty'
require 'rest-client'

def interpret(question)
    client = ApiAiRuby::Client.new(
    :client_access_token => "41557d5c2aba4049a730f1931f47b56e"
    )
    response=client.text_request "#{question}"
    case (response[:result][:metadata][:intentName])
    when ("Default Fallback Intent"),("Information"),("Welcome_question"),("Welcome_statement")
        [(response[:result][:fulfillment][:speech])]
    when ("Joke")
        [(response[:result][:fulfillment][:speech]),JSON.parse(RestClient.get('https://icanhazdadjoke.com/', {accept: :json}))['joke'],"Joke courtesy of Icanhazdadjoke.com"]
        
    when ("Recommend")
        media=(HTTParty.get("https://tastedive.com/api/similar?q=#{question.split(" ")[-1]}&limit=10&k=315473-Unnameda-N13F5JRB"))
        unless (media['Similar']['Info'][0]['Type']=="unknown")
        if (media['Similar']['Info'][0]['Type']=="music")
            [(response[:result][:fulfillment][:speech]),"The #{(media['Similar']['Info'][0]['Type'])}ian #{media['Similar']['Results'][rand(0..9)]['Name']}.", "Recommendation courtesy of TasteDive.com."]
        else 
            [(response[:result][:fulfillment][:speech]),"The #{(media['Similar']['Info'][0]['Type'])} #{media['Similar']['Results'][rand(0..9)]['Name']}", "Recommendation courtesy of TasteDive.com."]
        end
    else 
        return ["Sorry, I don't know them. Things that have a long names tends to confuse me. You should look it up on TasteDive.com, though."]
        end
    when ("Politics")
        return [(response[:result][:fulfillment][:speech]), "#{HTTParty.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random")['message']} - Donald Trump.", "Quote courtesy of whatdoestrumpthink.com"]
    when ("News")
        randarticle=rand(0..5)
        news=HTTParty.get("https://newsapi.org/v2/everything?q=#{question.split(" ")[-1]}&from=2018-08-02&sortBy=popularity&apiKey=02a374306ebd4e39a2f220c68dcd64e6")
        if (news["totalResults"].to_i)>=6
            news=news["articles"][randarticle]
            [(response[:result][:fulfillment][:speech]),"#{news["title"]}", "#{news["description"]}", "You can read more at <a href=#{news["url"]} class= \"pink-text lighten-5\"><u>Source</u></a></a>","Story courtesy of NewsAPI.com"]
        else
            ["Sorry, I couldn't find anything on that. Try again later or email my creator if you think I should've been able to."]
        end
    when ("Sadness")
        photo="http://thecatapi.com/api/images/get?format=src"
        [(response[:result][:fulfillment][:speech]),"<img class= \"responsive-img\" src=#{photo}>","Photo courtesy of TheCatAPI.com.","<a href=#{photo} class= \"pink-text lighten-5\"><u>Source</u></a>"]
    when ("Trivia")
        trivia=HTTParty.get("http://jservice.io/api/random")
        ["TT",trivia[0]['category']['title'],trivia[0]['question'],trivia[0]['answer']]
    else 
        [(response[:result][:fulfillment][:speech])]
    end
end

#response[:result][:metadata][:intentName]

=begin
list of functions:
DONE Trump Quotes (https://api.whatdoestrumpthink.com/api/v1/quotes/random) - Trump
DONE Cats (http://thecatapi.com/api/images/get?format=src) - Sadness 
Dictionary - Define/mean - 274d98f6-7aa7-4f0d-aec5-727bc045573c
Theasarus - Another word for/synonym - 7b17379a-1d67-445c-bcf7-b6c8e5ae6ce4
Recipies - (http://www.recipepuppy.com/about/api/?i=X&q=Y)- What can I make with X/ I'm hungry for Y
DONE Specific News - (https://newsapi.org/v2/everything?q=XXXXX&from=2018-08-02&sortBy=popularity&apiKey=02a374306ebd4e39a2f220c68dcd64e6) News about
Jeopardy - (http://jservice.io/api/random) - Trivia/question
DONE Dad jokes - (https://icanhazdadjoke.com/) - Jokes/Funny
DONE recommmendations - (https://tastedive.com/api/similar?q=X&limit=10&k=315473-Unnameda-N13F5JRB) - similar toX/ recommend ?
inspiration (http://quotes.rest/qod.json) -Inspire/uplift

maybe:
Weather - (http://api.openweathermap.org/data/2.5/weather?q=X&units=imperial&apikey=3a521c0680f8f5e15702aa4ae61bfb9d) Weather in X
math -(https://newton.now.sh/simplify/EXPRESSION) - adding/ subtract/multiply/division
=end