class CreateRoomPlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :room_places do |t|
      t.references :room, null: false, foreign_key: true, null: false
      t.references :place, null: false, foreign_key: true, null: false
      t.timestamps
    end
    add_index :room_places, [:room_id, :place_id], unique: true

  end
end
