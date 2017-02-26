class AddUserLocationAttributes < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float

    add_index :users, :latitude
    add_index :users, :longitude
  end
end