const express = require('express')
const { stat, createReadStream } = require('fs')
const { promisify } = require('util')

const routes = express.Router();
const fileInfo = promisify(stat);

routes.get('/video-static', (req, res, next) => {
    const fileName = __dirname + "/public/video/video.mp4";
    res.type("video/mp4");
    res.sendFile(fileName);
})

routes.get('/video-stream', (req, res, next) => {
    const fileName = "src/public/video/video.mp4";
    res.writeHead(200, {
      "Content-Type": "video/mp4"
    });
    createReadStream(fileName).pipe(res);
})

routes.get('/video-stream-second', async (req, res, next) => {
    const fileName = "src/public/video/video.mp4";
    const { size } = await fileInfo(fileName);
    const range = req.headers.range;
    if (range) {
      let [ start, end ] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size -1
      res.writeHead(200, {
        "Content-Type": "video/mp4",
        "Content-Length": size,
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${size}`
      });

      createReadStream(fileName, { start, end }).pipe(res);

    } else {
      res.writeHead(200, {
        "Content-Type": "video/mp4",
        "Content-Length": size 
      })
      createReadStream(fileName).pipe(res);
    }
  })

module.exports = routes;