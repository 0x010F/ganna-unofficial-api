import AuthController from "./auth.js";
import MusicController from "./music.js";
import {logSongDetails, downloadFile,logHeading} from './utils.js'


async function main(args) {
  try {

    const { deviceId } = await AuthController.verifyToken();
    const { track_id, track_title, artist } = await MusicController.getTrackDetails(args[0]);

    logSongDetails(artist[0].name,track_title);

    const { stream_path } = await MusicController.getTrackStreamURL(deviceId, track_id);

    await downloadFile(stream_path,track_title);
  }
  catch(err) {
    throw new Error(err);
  }

}

const args = process.argv.slice(2);

logHeading();
main(args)