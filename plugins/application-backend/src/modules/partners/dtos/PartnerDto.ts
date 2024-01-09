export class PartnerDto {
  name: string;
  active: boolean;
  email: string;
  keycloakId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    name: string,
    active: boolean,
    email: string,
    keycloakId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.name = name;
    this.active = active;
    this.email = email;
    this.keycloakId = keycloakId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
