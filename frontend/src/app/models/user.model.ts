export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public password?: string,
    public dni?: string,
    public phone?: string,
    public gender?: string,
    public birthday?: string,
    public image?: string,
    public created_at?: string,
    public id?: string
  ) {}

  imprimirUser() {
    console.log(this.first_name);
  }
}
