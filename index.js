const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    ytdl = require('ytdl-core'),
    rateLimit = require('express-rate-limit'),
    cors = require('cors');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10
});
app.use(cors());

app.use(limiter);

app.get('/', (_, res) => res.send('This server manages video download requests'));

app.get('/videoInfo', async function(request, response) {
    const videoURL = request.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    response.status(200).json(info);
});

app.get('/download', async(req, res) => {
    const videoFormat = req.query.format || 'mp4';
    const itag = req.query.itag;
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title;
    // eslint-disable-next-line no-useless-escape
    res.header('Content-Disposition', `attachment;\ filename="${title}.${videoFormat}"`);
    ytdl(videoURL, { filter: format => format.itag == itag }).pipe(res);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

