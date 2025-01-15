class RoomPlace < ApplicationRecord
  belongs_to :room
  belongs_to :place

  validates :room_id, uniqueness: { scope: :place_id, message: "にはこの場所は既に存在します" }

end
