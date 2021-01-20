export interface AdminModel {
  id?: string;
  email: string;
  _salt: string;
  _hash: string;
}
