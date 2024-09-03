import axios from 'axios';
import { InfracostEstimate } from '@veecode-platform/backstage-plugin-infracost-common';

export class InfracostService {

    async getAllInfracostProjectsEstimate(url:string): Promise<InfracostEstimate[]|[]>{
        try{
            const response = await axios(`${url}`);
            return response.data;
        }
        catch(error: any){
            console.error(`There was an error trying to get Infracost Projects Estimate [${error.message}]`)
            return[]
        }
    }

    async saveInfracostProjectsEstimate( endpoint:string, estimate:InfracostEstimate):Promise<void> {
        try {
            await axios.post(endpoint, estimate);
          } catch (error:any) {
            console.error(
              `There was an error trying persist Infracost Projects Estimate [${error}]`,
            );
          }
    }
}