import { Entity } from '../../../core/domain/Entity';
import CredentialRepresentation from '../dtos/CredencialRepresentation';

export type UserRepresentation = {
    id?: string;
    createdTimestamp?: number;
    username: string;
    enabled?: boolean;
    totp?: boolean;
    emailVerified?: boolean;
    disableableCredentialTypes?: string[];
    notBefore?: number;
    access?: Record<string, boolean>;
    attributes?: Record<string, any>;
    clientRoles?: Record<string, any>;
    credentials?: CredentialRepresentation[];
    email: string;
    federationLink?: string;
    firstName: string;
    groups?: string[];
    lastName: string;
    origin?: string;
    realmRoles?: string[];
    self?: string;
    serviceAccountClientId?: string;
}

export class User extends Entity<UserRepresentation>{
  private constructor(
    props: UserRepresentation,
    id?: string,
  ) {
    super(props,id);
  }
}
