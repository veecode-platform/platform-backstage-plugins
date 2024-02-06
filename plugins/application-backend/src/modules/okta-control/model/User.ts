export class User {
  id: string;
  status: string;
  created: string;
  activated: string;
  statusChanged: string;
  lastLogin: string;
  lastUpdated: string;
  passwordChanged: string;
  type: Type;
  profile: Profile;

  constructor(
    id: string,
    status: string,
    created: string,
    activated: string,
    statusChanged: string,
    lastLogin: string,
    lastUpdated: string,
    passwordChanged: string,
    type: Type,
    profile: Profile,
  ) {
    this.id = id;
    this.status = status;
    this.created = created;
    this.activated = activated;
    this.statusChanged = statusChanged;
    this.lastLogin = lastLogin;
    this.lastUpdated = lastUpdated;
    this.passwordChanged = passwordChanged;
    this.type = type;
    this.profile = profile;
  }
}
type Type = {
  id: string;
};

type Profile = {
  firstName: string;
  lastName: string;
  mobilePhone: string;
  secondEmail: string;
  login: string;
  email: string;
};
