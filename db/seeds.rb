records = 0
failed = 0

require 'csv'

csv_text = File.read(Rails.root.join('db', '1000_cues_with_tags.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  # puts ''
  # puts 'starting'
  song_params = row.to_hash
  # puts song_params
  tags = song_params['tags'].split(',').uniq.map do |tag|
    tag = Tag.find_by(name: tag.lstrip) || Tag.new(name: tag.lstrip)
    tag.valid? ? tag : nil
  end

  song = Song.new(name: song_params['song'], tags: tags.compact)
  # puts song
  # puts song.valid?
  puts "#{failed} out of #{records} failed"

  if song.valid?
    song.save
    records += 1
  else
    puts song_params
    puts song.errors.full_messages
    puts song.name
    puts ' *************** '
    puts ''
    records += 1
    failed += 1
  end
  # puts 'ending'
  # puts ' *************** '
end

puts "#{failed} out of #{records} failed"


# song_params = {
#   "song"=>"Good King Wenceslas 002-JP",
#   "tags"=>"coffee,Starbucks,Twee,Xmas,Christmas,cheerful,Light,folky,Twee,Xmas,Christmas,cheerful,Light,folky,cheerful,Fun,Holidays,Christmas"
#   # "tags"=>"coffee,Starbucks,Twee,Xmas,Christmas,cheerful,Light,folky,Fun,Holidays"
# }
# puts song_params
# tags = song_params['tags'].split(',').uniq.map do |tag|
#   tag = Tag.find_by(name: tag.lstrip) || Tag.new(name: tag.lstrip)
#   tag.valid? ? tag : nil
# end
#
# puts tags
#
# song = Song.new(name: song_params['song'], tags: tags.compact)
# puts song
# puts song.valid?
#
# if song.valid?
#   song.save
# else
#   puts song.errors.full_messages
#   puts song.name
# end
# puts 'ending'
# puts ' *************** '




# rock = Tag.create(name: 'rock')
# heavy = Tag.create(name: 'heavy')
# prog = Tag.create(name: 'prog')
#
# Song.create({name: 'One', tags: [rock, heavy]})
# Song.create({name: 'Falling', tags: [rock, prog]})
# Song.create({name: 'Wing', tags: [prog]})
