import db from "#db/client";

export async function addTracktoPlaylist(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks(playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [addedTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return addedTrack;
}

export async function getPlaylistTracks(id) {
  const sql = `
     SELECT 
      *,
      (
        SELECT json_agg(playlists_tracks)
        FROM playlists_tracks
        WHERE playlists_tracks.playlist_id = playlists.id
      ) AS playlists_tracks
      FROM playlists
      WHERE id = $1
  `;

  const { rows: playlistTracks } = await db.query(sql, [id]);
  return playlistTracks;
}
