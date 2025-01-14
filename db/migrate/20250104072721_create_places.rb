class CreatePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.string :name,       null: false
      t.string :category 
      t.string :prefecture, null: false
      t.string :address,    null: false
      t.text   :url,        null: false
      t.text   :website
      t.float :latitude,    null: false
      t.float :longitude,   null: false
      t.string :place_id,   null: false
      t.references :user,   null: false, foreign_key: true 
      t.timestamps
    end
  end
end
