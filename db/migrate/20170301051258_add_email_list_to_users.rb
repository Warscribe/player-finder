class AddEmailListToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :email_list, :boolean
  end
end
