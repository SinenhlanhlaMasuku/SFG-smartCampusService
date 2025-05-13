export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
  // Add other relevant user details
}