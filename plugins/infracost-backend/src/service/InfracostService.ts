import axios from 'axios';
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';

export class InfracostService {

  async getAllInfracostProjectsEstimate(url: string, token?: string): Promise<InfracostEstimate[] | []> {
    try {
      const response = await axios(url, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      });
      return await response.data
    }
    catch (error: any) {
      console.error(`There was an error trying to get Infracost Projects Estimate [${error.message}]`)
      return []
    }
  }

  async saveInfracostProjectsEstimate(endpoint: string, estimate: InfracostEstimate, token?: string): Promise<void> {
    console.log(endpoint);
    try {
      await axios.post(endpoint, estimate, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error: any) {
      console.error(
        `ooops.....There was an error trying persist Infracost Projects Estimate [${error}]`,
      );
    }
  }
}