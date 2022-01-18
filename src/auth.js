import axios from 'axios';

export default class AuthController {
  static async verifyToken() {
    try {
      const endpoint = "https://gaana.com/api/verifyToken";
      const payload = {
        endpoint: ""
      }
      const response = await axios.post(endpoint,payload);
      return response.data;
    }
    
    catch(err) {
      throw new Error(err);
    }
  }
};