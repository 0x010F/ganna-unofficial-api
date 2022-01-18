import axios from "axios";
import FormData from "form-data";
import { createMd5StreamToken,parseSeoKeyFromURL } from "./utils.js";

export default class MusicController {

  static async getTrackDetails(trackUrl) {
    try {
      const seoKey = parseSeoKeyFromURL(trackUrl);
      const endpoint = `https://gaana.com/apiv2?seokey=${seoKey}&type=songDetail`;
      const response = await axios.post(endpoint);
      return response.data?.tracks[0];
    }
    catch(err) {
      throw new Error(err);
    }
  }

  static async getTrackStreamURL(deviceId, trackId) {
    try {
      const md5Token = createMd5StreamToken(deviceId, trackId);

      const payload = new FormData();
      payload.append('ht', md5Token);
      payload.append('ps', deviceId);
      payload.append('quality', 'high');
      payload.append('track_id', trackId);
      payload.append('request_type', 'web');

      const endpoint = "https://apiv2.gaana.com/track/stream";

      const response = await axios.post(endpoint, payload, {
        headers: payload.getHeaders()
      });
      
      return response.data;
    }
    catch (err) {
      throw new Error(err);
    }
  }
};