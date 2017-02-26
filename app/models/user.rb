class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :omniauthable

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, if: ->(user) {
    user.city.present? &&
    user.city_changed? &&
    user.country.present? &&
    user.country_changed?
  }

  private

  def address
    "#{city}, #{country}"
  end
end
