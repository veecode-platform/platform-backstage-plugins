export class ApplicationDto {
  creator: string;
  partner?: string;
  name: string;
  description?: string;
  services: string[];
  active?: boolean;
  statusKong?: string;
  createdAt?: Date;
  updatedAt?: Date;
  consumerName?: string[];

  constructor(
    creator: string,
    partner: string,
    name: string,
    services: string[],
    active?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    description?: string,
    statusKong?: string,
    consumerName?: string[],
  ) {
    this.creator = creator;
    this.partner = partner;
    this.name = name;
    this.description = description;
    this.services = services;
    this.active = active;
    this.statusKong = statusKong;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.consumerName = consumerName;
  }
}
// kong consumer class
export type Consumer = {
  id: string;
  username: string;
  custom_id: string;
  created_at: Date;
  updated_at: Date;
  key_authentication: KeyAuthentication[];
};

export type KeyAuthentication = {
  id: string;
  key: string;
  created_at: Date;
};
