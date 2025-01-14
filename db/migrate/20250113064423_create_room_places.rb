class CreateRoomPlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :room_places do |t|
      t.references :room, null: false, foreign_key: true
      t.references :place, null: false, foreign_key: true
      t.timestamps
    end
  end
end
