import axios from 'axios';
import { Consumer } from '../model/Consumer';
import { KongServiceBase } from './KongServiceBase';

export class ConsumerService extends KongServiceBase {
  private static _instance: ConsumerService;

  public constructor() {
    super();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async findConsumer(consumerName: string) {
    try {
      const url = `${await this.getBaseUrl()}/consumers/${consumerName}`;
      const response = await axios
        .get(url, {
          headers: await this.getAuthHeader(),
        })  
      return response.data;
    }       
    catch(error:any){
      throw new Error(error.message)
    }
  }

  public async deleteConsumer(consumerId: string): Promise<Consumer> {
    try {
      const url = `${await this.getBaseUrl()}/consumers/${consumerId}`;
      const response = await axios
        .delete(url, {
          headers: await this.getAuthHeader(),
        })
      const consumer = response.data;
      return consumer;
    } 
    catch(error:any){
      throw new Error(error.message)
    }
  }

  public async createConsumer(consumer: Consumer): Promise<Consumer> {
    try {
      const baseUrl = await this.getBaseUrl()
      const url = `${baseUrl}/consumers`;
      const response = await axios
        .post(url, consumer, {
          headers: await this.getAuthHeader(),
        })
      return response.data.consumer;  
    } 
    catch(error:any){
      throw new Error(error.message)
    }
  }

  public async addAclToConsumer(consumer: Consumer, service:string): Promise<Consumer> {
    try {
      const baseUrl = await this.getBaseUrl()  
      const url = `${baseUrl}/consumers/${consumer.username}/acls`;
      const response = await axios.post(url, {"group": service}, {headers: await this.getAuthHeader()});
      return response.data.consumer;
    } 
    catch(error:any){
      throw new Error(error.message)
    }
  }

  public async removeAclFromConsumer(consumer: Consumer, service:string): Promise<Consumer> {
    try {
      const baseUrl = await this.getBaseUrl()  
      const url = `${baseUrl}/consumers/${consumer.username}/acls/${service}`;
      const response = await axios.delete(url)
      return response.data.consumer;
    } 
    catch(error:any){
      throw new Error(error.message)
    }
  }

  public async updateConsumer(consumerId: string,consumer: Consumer): Promise<Consumer> {
    try {
      const url = `${await this.getBaseUrl()}/consumers/${consumerId}`;
      const response = await axios
        .put(url, consumer, {
          headers: await this.getAuthHeader(),
        })
      return response.data.consumer; 
    } 
    catch(error:any){
      throw new Error(error.message)
    }
  }
}
