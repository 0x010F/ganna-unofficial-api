import crypto from 'crypto';
import chalk from 'chalk';
import {spawn,exec} from 'child_process';

export function createMd5StreamToken(deviceId, trackId){
  let token = String(trackId) + "|" + deviceId + "|03:40:31 sec";
  let token_utf8 = Buffer.from(token,"utf-8").toString();
  let token_md5 = crypto.createHash('md5').update(token_utf8).digest('hex').toString() + deviceId.slice(3,9) + "="; 
  return token_md5;
}


export function parseSeoKeyFromURL(trackURL) {
  return trackURL.split("/song/")[1];
}

// logging

export const logSongDetails = (artist, title) => {
  console.log("\nAritst: " + chalk.blue(artist));
  console.log("Song: " + chalk.yellow(title));
}


export const logHeading = () => {
  console.log(chalk.bold("----- Gaana Music Downloader -----"))
}

// ffmppeg download 

export async function downloadFile(url,title){
  
  console.log("\nDowloading "+title);
  const command = `ffmpeg -i ${String(url)} -acodec mp3 -ab 257k songs/${title.split(" ").join("-")}.mp3`;
  
  const sp = spawn(command, {shell:true});

  sp.stdout.on('close',() => {
    console.log(chalk.greenBright("Download Complete"));
  });

}