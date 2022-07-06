import Artist from "../models/Artist";

/**
 *
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
