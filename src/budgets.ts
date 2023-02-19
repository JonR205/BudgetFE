export class Budget {
  constructor(
    public budgetname: string,
    public total: number,
    public associatedDestination: string,
    public id: number | null = null
  ) {
    this.budgetname = budgetname;
    this.total = total;
    this.associatedDestination = associatedDestination;
    this.id = id;
  }
}
