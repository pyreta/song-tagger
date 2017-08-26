class Song < ApplicationRecord
  scope :includes_search, -> (search) { where("name like ?", "%#{search}%")}
  validates :name, length: { minimum: 3 }, uniqueness: true
  validate :at_least_one_tag, :no_special_characters
  has_many :taggings
  has_many :tags, through: :taggings

  accepts_nested_attributes_for :tags, :taggings

  def no_special_characters
    special = '!@#$%^*()+=[]{};"><`~'
    regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
    if name.split(regex).length > 1
      errors.add(:song, "Cannot contain special characters")
    end
  end

  def at_least_one_tag
    if !tags || tags.length < 1
      errors.add(:song, "Needs at least one tag")
    end
  end
end
