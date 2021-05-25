class Api::V1::RecommendationsController < ApplicationController

  def index
    @user = current_user
    movies_favorited = current_user.favorites.map(&method(:get_movie_or_serie_from_favorite))
    movies_watched = current_user.players.map(&method(:get_movie_or_serie_from_player))
    movies_favorited ||= []
    movies_watched ||= []
    total = movies_favorited | movies_watched
    options = total.flat_map(&method(:get_category_and_pass_forward)).uniq{|i| i != nil ? i.id : i}
    options = options - total
    options -= [nil]
    result = Api::V1::WatchableSerializer.new(options, params: { user: @user })
    render json: result
  end
  
  def get_movie_or_serie_from_favorite(favorite)
    watchable = nil
    if favorite.favoritable_type == "Movie"
      watchable = Movie.find(favorite.favoritable_id)
    elsif favorite.favoritable_type == "Serie"
      watchable = Serie.find(favorite.favoritable_id)
    end
    watchable
  end

  def get_movie_or_serie_from_player(player)
    watchable = player.movie
    if player.movie.watched_serie != nil
      watchable = player.movie.watched_serie
    end
    watchable
  end

  def get_movies_or_series_from_category(category)
    if category == nil
      return nil
    end
    watchable = category.movies
    watchable += category.series
    watchable
  end

  def get_category_and_pass_forward(watchable)
    result = nil
    if watchable != nil
      result = get_movies_or_series_from_category(watchable.category)
    end
    result
  end

end
