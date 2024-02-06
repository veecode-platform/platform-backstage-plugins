export class UserInvite {
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  mobilePhone: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    login: string,
    mobilePhone: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.mobilePhone = mobilePhone;
  }
}
