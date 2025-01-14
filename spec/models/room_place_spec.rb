require 'rails_helper'
RSpec.describe RoomPlace, type: :model do
  it "validates uniqueness of place within the same room" do
    room = create(:room)
    place = create(:place)
    RoomPlace.create!(room: room, place: place)

    duplicate = RoomPlace.new(room: room, place: place)
    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:room_id]).to include("にはこの場所は既に存在します")
  end
end
