export interface IApplication  {
    id: string,
    name: string;
    active?: boolean | null;
    creator: string;
    servicesId: string[];
    kongConsumerName?: string;
    kongConsumerId?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

export interface ICreateApplication{
  name: string,
  creator: string,
  active: boolean | null;
  servicesId: string[] | any,
  // kongConsumerName: string,
  // kongConsumerId: string,
}

export interface IErrorStatus {
  name: boolean
}