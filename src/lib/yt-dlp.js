import { exec } from "child_process";

/**
 * Get video metadata as JSON
 */
export const getVideoInfo = async (url) => {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -j "${url}"`, (err, stdout, stderr) => {
      if (err) return reject(stderr || err);
      resolve(JSON.parse(stdout));
    });
  });
};

/**
 * Download video/audio as MP3
 */
export const downloadAudio = async (url, outputPath) => {
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`, (err, stdout, stderr) => {
      if (err) return reject(stderr || err);
      resolve(stdout);
    });
  });
};
