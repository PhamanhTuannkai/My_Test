export interface User {
  id: number;
  name: string;
  phone?: string;
  role: 'admin' | 'branch-admin' | 'staff' | 'user';
  branchId?: string;
}
