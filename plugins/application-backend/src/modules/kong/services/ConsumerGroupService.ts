import axios from 'axios';
import { ConsumerGroup } from '../model/ConsumerGroup';
import { KongServiceBase } from './KongServiceBase';

export class ConsumerGroupService extends KongServiceBase {
  private static _instance: ConsumerGroupService;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

    public async createConsumerGroup(consumerGroup: ConsumerGroup): Promise<ConsumerGroup> {
      try {
        const baseUrl = await this.getBaseUrl()
        const url = `${baseUrl}/consumer_groups`;
        const response = await axios.post(url, 
          {
            name: consumerGroup.name,
            tags: ["managed-by-devportal"]
          },
          {
            headers: await this.getAuthHeader(),
          })
        return response.data        
      } 
      catch(error:any){
        throw new Error(error.message)
      }

    }

  public async listConsumerGroups(): Promise<ConsumerGroup[]> {
    try {
      const url = `${await this.getBaseUrl()}/consumer_groups`;
      const response = await axios.get(url, 
        {
          headers: await this.getAuthHeader(),
        })
      const groups = response.data.data;
      return groups.map((group: ConsumerGroup) => group);      
    } 
    catch (error:any) {
      throw new Error(error.message);    
    }

  }

  public async deleteConsumerGroup(consumerGroupId: string): Promise<ConsumerGroup> {
    try {
      const url = `${await this.getBaseUrl()}/consumer_groups/${consumerGroupId}`;
      const response = await axios.delete(url, 
        {
          headers: await this.getAuthHeader(),
        })
      const consumerGroup = response.data;
      return consumerGroup;
      
    } 
    catch (error:any) {
      throw new Error(error.message);
      
    }
  }

  public async addConsumerToGroup(consumerGroupId: string, consumerId: string) {
    try {
      const baseUrl = await this.getBaseUrl()
      const url = `${baseUrl}/consumer_groups/${consumerGroupId}/consumers`;
      const response = await axios.post(url,
          { consumer: consumerId },
          { headers: await this.getAuthHeader()},
        )
      return response.data;      
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }
  }

  public async removeConsumerFromGroups(consumerId: string) {
    try{
      const url = `${await this.getBaseUrl()}/consumers/${consumerId}/consumer_groups`;
      const response = await axios.delete(url, 
        {
          headers: await this.getAuthHeader(),
        })
  
      const consumerGroup = response.data;
      return consumerGroup;
    }
    catch(error:any){
      throw new Error(error.message);     
    }
  }

  public async removeConsumerFromGroup(consumerId: string,consumerGroupId: string) {
    try {
      const url = `${await this.getBaseUrl()}/consumers/${consumerId}/consumer_groups/${consumerGroupId}`;
      const response = await axios.delete(url, {
          headers: await this.getAuthHeader(),
        })  
      const consumerGroup = response.data;
      return consumerGroup;
    } 
    catch (error:any) {
      throw new Error(error.message);     
    }
  }
}
