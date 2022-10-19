const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg'); 
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const spawn = require('child_process').spawn;

let FilePath = 'https://epiconvh.s.llnwi.net/showbox/master_1024.m3u8';
let streamKey = 'rtmp://ingest.mediaserver.express/live/qeFm8g3b?pwd=16d3ff';

let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `${ streamKey }`]);
ffmpeg.on('exit', (statusCode) => {
  if (statusCode === 0) {
     console.log('Stream Completed')
  }
})

ffmpeg
  .stderr
  .on('data', (task) => {
    console.log('Task:', new String(task))
  })
