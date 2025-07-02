import db from "#db/client";
import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { addTracktoPlaylist } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO (20 tracks, 10 playlists, 15 playlist tracks)
  for (let i = 0; i <= 10; i++) {
    await createPlaylist(`Playlist ${i}`, `Description of Playlist ${i}`);
  }

  for (let i = 0; i <= 20; i++) {
    // random number between 2 and 6 = song in minutes
    const duration = 2 + Math.floor(Math.random() * 6);
    await createTrack(`Track ${i}`, duration);
  }

  for (let i = 0; i <= 15; i++) {
    const trackId = 1 + Math.floor(Math.random() * 20);
    const playlistId = 1 + Math.floor(Math.random() * 10);
    await addTracktoPlaylist(playlistId, trackId);
  }
}
