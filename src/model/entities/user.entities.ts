export interface User {
  id: string;
  name: string;
  phone?: string;
  role: 'admin' | 'branch-admin' | 'staff' | 'user';
  branchId?: string;
}
