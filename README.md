# ytdl-API

A simple API using `ytdl-core` module to convert and download youtube videos in mp4 / mp3.

request query takes 3 parameters

host/download?videoURL={urlHere}&itag={itagHere}&format={vidFormatHere}

videoURL is a required parameter

itag is required field for video quality

format is optional, when omitted returns mp4

## API rate limit

10 requests per minute per IP
