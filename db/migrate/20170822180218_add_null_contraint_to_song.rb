class AddNullContraintToSong < ActiveRecord::Migration[5.1]
  def change
    change_column :songs, :name, :string, null: false
  end
end
