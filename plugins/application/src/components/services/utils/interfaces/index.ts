export interface IService {
  id?: string,
  name: string,
  active?:  boolean | null,
  description: string,
  partnersId: string[],
  rateLimiting: number | any,
  kongServiceName: string | any,
  kongServiceId: string,
  securityType: string | any,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  route?: string
}

export interface ICreateService{
    name: string,
    kongServiceName: string | any,
    active: boolean | null;
    description: string,
    kongServiceId: string,
    securityType: string | any,
    rateLimiting: number | any,
}

export interface IPartner {
  id: string;
  name: string;
  email: string;
  celular: string;
  servicesId: string[];
}

export interface IKongServices {
  id: string;
  name: string;
}
