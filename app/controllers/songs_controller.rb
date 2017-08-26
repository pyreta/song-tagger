PAGE_SIZE = 10

class SongsController < ApplicationController

  def start_idx(page, number_of_records)
    PAGE_SIZE * (page.to_i - 1)
  end

  def end_idx(page, number_of_records)
    start = start_idx(page, number_of_records)
    last = start + PAGE_SIZE
    number_of_records > last ? last - 1 : number_of_records
  end

  def tags_contain_search(tags, search)
    tags.each do |tag|
      return true if tag.name.downcase.include?(search.downcase)
    end

    false
  end

  def index
    search = params[:search]
    page = params[:page]

    @songs = Song.all.select do |song|
      song.name.downcase.include?(search.downcase) ||
      tags_contain_search(song.tags, search) ||
      search.length == 0
    end

    render json: {
      songs: @songs[start_idx(page, @songs.length)..end_idx(page, @songs.length)]
        .to_json(include: [:tags]),
      total_songs: @songs.length,
      page: page,
      page_size: PAGE_SIZE
    }
  end

  def create
    tags = song_params[:tags].split(',').uniq.map do |tag|
      tag = Tag.find_by(name: tag.lstrip) || Tag.new(name: tag.lstrip)
      tag.valid? ? tag : nil
    end

    @song = Song.new(name: song_params[:name], tags: tags.compact)

    if @song.save
      render json: { response: @song.as_json(include: [:tags]) }
    else
      puts @song.errors.full_messages
      render json: { errors: @song.errors.full_messages }
    end
  end

  def update
    tags = song_params[:tags].split(',').map do |tag|
      tag = Tag.find_by(name: tag.lstrip) || Tag.new(name: tag.lstrip)
      tag.valid? ? tag : nil
    end

    @song = Song.find(params[:id].to_i)
    @song.update(name: song_params[:name], tags: tags.compact)

    render json: Song.all.to_json(include: [:tags])
  end

  def destroy
    @song = Song.find(params[:id].to_i)
    @song.tags.each { |tag| Tag.delete(tag.id) if tag.songs.length <= 1 }
    Song.delete(params[:id].to_i)

    render json: { total_songs: Song.all.length }
  end

  def song_params
    params.require(:song).permit(:name, :tags, :id, :search)
  end
end
