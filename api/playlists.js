import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from "#db/queries/playlists";

import {
  addTracktoPlaylist,
  getPlaylistTracks,
} from "#db/queries/playlists_tracks";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body not provided.");

    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .send("Request body must include: name, description.");
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylist(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }
  req.playlist = playlist;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const playlistTracks = await getPlaylistTracks(id);
    if (!playlistTracks) {
      return res.status(400).send("This playlist is currently empty.");
    }
    req.send(playlistTracks);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("Request body not provided.");
    }
    const { playlistId, trackId } = req.body;
    if (!playlistId || !trackId) {
      return res
        .status(400)
        .send("Request body must include: playlist_id, track_id");
    }

    const playlistTrack = await addTracktoPlaylist(playlistId, trackId);
    res.status(201).send(playlistTrack);
  });
