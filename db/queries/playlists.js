import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
    INSERT INTO playlists(name, description) 
    VALUES ($1, $2) 
    RETURNING *
    `;
  const { rows: playlist } = db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;

  const { rows: playlists } = db.query(sql);
  return playlists;
}

export async function getPlaylist(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;

  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

// export async function getPlaylistTracks(id) {
//   const sql = `
//      SELECT
//       *,
//       (
//         SELECT json_agg(playlists_tracks)
//         FROM playlists_tracks
//         WHERE playlists_tracks.playlist_id = playlists.id
//       ) AS playlists_tracks
//       FROM playlists
//       WHERE id = $1
//   `;

//   const { rows: playlistTracks } = await db.query(sql, [id]);
//   return playlistTracks;
// }
