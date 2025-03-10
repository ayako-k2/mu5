class Comment < ApplicationRecord
  validates :text, presence: true
  belongs_to :user
  belongs_to :place

  after_create_commit { broadcast_update }
  after_destroy_commit { broadcast_update }

  private

  def broadcast_update
    broadcast_replace_to "place_#{place.id}_comments", 
      target: "comment-count-#{place.id}", 
      partial: "places/comment_count", 
      locals: { place: place }
  end
end
