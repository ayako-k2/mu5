class Room < ApplicationRecord
  belongs_to :user
  has_many :room_places, dependent: :destroy
  has_many :places, through: :room_places

  has_one_attached :image

  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
end
