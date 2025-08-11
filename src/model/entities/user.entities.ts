export interface User {
  id: number;
  name: string;
  phone?: string;
  role: 'admin' | 'staff' | 'user';
  branchId?: string;
}
