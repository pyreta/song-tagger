class Tag < ApplicationRecord
  validates :name, length: { minimum: 3 }, uniqueness: true
  validate :no_special_characters
  has_many :taggings
  has_many :songs, through: :taggings

  def no_special_characters
    special = '!@#$%^*()+=[]{};"><`~'
    regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
    if name.split(regex).length > 1
      errors.add(:tag, "Cannot contain special characters")
    end
  end
end
