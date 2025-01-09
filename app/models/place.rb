class Place < ApplicationRecord
  validates :name, :address, :url, :latitude, :longitude, :place_id, :prefecture, presence: true
  validates :place_id, uniqueness: true

  belongs_to :user
  has_many :comments
end
