export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordExpiryDate?: string;
  hasToChangePasswordAfterLogin?: string;
  lastActivityUser?: string;
  status?: string;
}
