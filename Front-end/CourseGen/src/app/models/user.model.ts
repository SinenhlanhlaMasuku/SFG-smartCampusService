export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
  // Add other relevant user details

}
export interface PendingUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string; // 'LECTURER' or 'STUDENT'
}