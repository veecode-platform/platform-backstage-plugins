export interface IPartner {
    id?: string, 
    name: string,
    active?:  boolean | null,
    email: string,
    phone: number | string, // to do
    servicesId: string[] | any[],
    applicationsId?: string[] | any[],
    createdAt?: string, 
    updatedAt?: string, 
  }

export interface ICreatePartner{
  name: string,
  active?:  boolean | null,
  email: string,
  phone: number | string, // to do
  servicesId: string[] | any,
}

export interface IErrorStatus {
  name: boolean,
  email: boolean,
}