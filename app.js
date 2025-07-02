import express from "express";
const app = express();
export default app;

import trackRouter from "#api/tracks";
import playlistRouter from "#api/playlists";

app.use(express.json());
app.use("/tracks", trackRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send(err.detail);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong:(");
});
