export class BankAccount {
  constructor(
    public name: string,
    public type: string,
    public balance: number,
    public id: number | null = null
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.balance = balance;
  }
}
