import Artist from "../models/Artist";

/**
 * Adds Songs to the Artist, One song can have multiple artists
 * @param {String[]} artists
 * @param {String} songId
 */
export const addSongToArtists = async (artists, songId) => {
  artists.map(async (art) => {
    let artist = await Artist.findById(art);
    artist.songs.push(songId);
    await artist.save();
  });
};

/**
 * Adds Rating and computes average rating for the Artist
 * @param {String[]} artists
 * @param {Number} rating
 * @param {boolean} old
 * @param {Number} oldScore
 */
export const addRatingToArtist = async (
  artists,
  rating,
  old = true,
  oldScore = 0
) => {
  artists.map(async (art) => {
    let artist = await Artist.findById(art);
    if (old) {
      let avg = artist.avgRating,
        n = artist.songsRated,
        tot = avg * n;
      tot += rating;
      let avgRating = tot / (n + 1);
      artist.avgRating = avgRating;
      artist.songsRated += 1;
      await artist.save();
    } else {
      let avg = artist.avgRating,
        n = artist.songsRated,
        tot = avg * n;
      tot = tot - oldScore + rating;
      let avgRating = tot / n;
      artist.avgRating = avgRating;
      await artist.save();
    }
  });
};
