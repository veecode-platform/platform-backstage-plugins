import CredentialRepresentation from './CredencialRepresentation';

export class UserDto {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;

  constructor(
    username: string,
    email: string,
    firstName?: string,
    lastName?: string,
  ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class UpdateUserDto {
  id?: string;
  createdTimestamp?: number;
  username?: string;
  enabled?: boolean;
  totp?: boolean;
  emailVerified?: boolean;
  disableableCredentialTypes?: string[];
  notBefore?: number;
  access?: Record<string, boolean>;
  attributes?: Record<string, any>;
  clientRoles?: Record<string, any>;
  credentials?: CredentialRepresentation[];
  email?: string;
  federationLink?: string;
  firstName?: string;
  groups?: string[];
  lastName?: string;
  origin?: string;
  realmRoles?: string[];
  self?: string;
  serviceAccountClientId?: string;

  constructor(
    username: string,
    id: string,
    createdTimestamp: number,
    enabled: boolean,
    totp: boolean,
    emailVerified: boolean,
    disableableCredentialTypes: string[],
    notBefore: number,
    access: Record<string, boolean>,
    attributes: Record<string, any>,
    clientRoles: Record<string, any>,
    credentials: CredentialRepresentation[],
    email: string,
    federationLink: string,
    firstName: string,
    groups: string[],
    lastName: string,
    origin: string,
    realmRoles: string[],
    self: string,
    serviceAccountClientId: string,
  ) {
    this.username = username;
    this.id = id;
    this.createdTimestamp = createdTimestamp;
    this.enabled = enabled;
    this.totp = totp;
    this.emailVerified = emailVerified;
    this.disableableCredentialTypes = disableableCredentialTypes;
    this.notBefore = notBefore;
    this.access = access;
    this.attributes = attributes;
    this.clientRoles = clientRoles;
    this.credentials = credentials;
    this.email = email;
    this.federationLink = federationLink;
    this.firstName = firstName;
    this.groups = groups;
    this.lastName = lastName;
    this.origin = origin;
    this.realmRoles = realmRoles;
    this.self = self;
    this.serviceAccountClientId = serviceAccountClientId;
  }
}
