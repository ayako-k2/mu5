class Place < ApplicationRecord
  validates :name, :address, :category, :url, :latitude, :longitude, :place_id, :prefecture, presence: true

  belongs_to :user
  has_many :comments
  has_many :room_places
  has_many :rooms, through: :room_places


  def self.ransackable_associations(auth_object = nil)
    ["comments", "user"]
  end
  
  def self.ransackable_attributes(auth_object = nil)
    ["name", "category", "prefecture", "address"]
  end
end
