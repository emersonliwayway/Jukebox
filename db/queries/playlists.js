import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
    INSERT INTO playlists(name, description) 
    VALUES($1, $2) 
    RETURNING *
    `;
  const { rows: playlist } = db.query(sql, [name, description]);
  return playlist;
}
