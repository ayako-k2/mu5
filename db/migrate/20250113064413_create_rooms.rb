class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.string :name, null:false
      t.string :description, null:false 
      t.references :user,   null: false, foreign_key: true 
      t.timestamps
    end
  end
end
