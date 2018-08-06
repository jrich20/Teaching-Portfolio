require 'httparty'
class SampleModel
  attr_accessor :name, :age
end
data =  HTTParty.get('https://api.sne.space/catalog')
$sne_name = []
$sne_disc = []
$sne_host = []
$sne_type = []

data.each do |key,value|
    if(data[key]["claimedtype"].empty? == false && data[key]["discoverdate"].empty? == false && data[key]["host"].empty? == false)
         $sne_name.push(key)
          $sne_disc.push(data[key]["discoverdate"][0]["value"])
          $sne_host.push(data[key]["host"][0]["value"])
          $sne_type.push(data[key]["claimedtype"][0]["value"])
    end
    if $sne_type.length > 10
        break
    end
end

