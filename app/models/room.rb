class Room < ApplicationRecord
  belongs_to :user
  has_many :room_places
  has_many :places, through: :room_places
end
