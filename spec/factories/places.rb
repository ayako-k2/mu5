FactoryBot.define do
  factory :place do
    name { "Test Place" }
    address { "123 Test St" }
    category { "Test Category" }
    url { "http://example.com" }
    latitude { "35.6895" }
    longitude { "139.6917" }
    place_id { "tokyo-tower" }
    prefecture { "東京都" }
    user
  end
end