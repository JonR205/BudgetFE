export class Transaction {
  constructor(
    public sourceOrDestination: string,
    public amount: number,
    public budgetId: number,
    public bankId: number,
    public id: number | null = null
  ) {
    this.sourceOrDestination = sourceOrDestination;
    this.amount = amount;
    this.budgetId = budgetId;
    this.bankId = bankId;
    this.id = id;
  }
}
