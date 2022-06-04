export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public password?: string,
    public dni?: string,
    public image?: string,
    public status?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public created_at?: Date,
    public id?: string
  ) {}
}
