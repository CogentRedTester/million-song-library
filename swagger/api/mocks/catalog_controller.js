(function() {
  'use strict';

  var data = require('./data.js');
  var _ = require('lodash');

  module.exports = {
    get_song: get_song,
    get_artist: get_artist,
    browse_songs: browse_songs,
    browse_albums: browse_albums,
    browse_artists: browse_artists,
  };

  function get_song(req, res) {
    var songId = req.swagger.params.songId.value;
    var song = _.findWhere(data.songs, { song_id: songId }) || {};
    res.json(song);
  }

  function get_artist(req, res) {
    var artistId = req.swagger.params.artistId.value;
    var artist = _.findWhere(data.artists, { artist_id: artistId });
    res.json(artist);
  }

  function browse_songs(req, res) {
    var facets = JSON.parse(req.swagger.params.facets.value || "{}");
    var genreName = facets.genre;
    var rating = facets.rating;
    var artist = facets.artist;

    res.json({
      last_pos: '',
      songs: filterCatalog(genreName, rating, artist),
    });
  }

  function browse_albums(req, res) {
    res.json({
      last_pos: '',
      albums: data.albums,
    });
  }

  function browse_artists(req, res) {
    res.json({
      last_pos: '',
      artists: data.artists,
    });
  }

  function filterCatalog(genreName, rating, artist) {
    var res;
    if(genreName) {
       res = _.filter(data.songs, function(song) {
        return song.genre.toLowerCase() == genreName.toLowerCase();
      });
    }
    else {
      res = data.songs;
    }

    if(rating) {
       res = _.filter(res, function(song) { return song.average_rating >= rating; });
    }

    if(artist) {
      res = _.filter(res, function(song) { return song.artist_id == artist });
    }

    return res;
  }
})();
