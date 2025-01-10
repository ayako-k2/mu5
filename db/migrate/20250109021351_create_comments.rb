class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :text,   null: false
      t.integer :user_id,   null: false
      t.integer :place_id,   null: false

      t.timestamps
    end
  end
end
