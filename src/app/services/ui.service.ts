import { Injectable } from '@angular/core';
import { BankAccount } from 'src/bankaccount';
import { Budget } from 'src/budgets';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, take } from 'rxjs';
import { Transaction } from 'src/transactions';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  public bankAccounts: BankAccount[] = [];
  private bankAccountsSubject: Subject<BankAccount[]> = new Subject();
  public budgets: Budget[] = [];
  private budgetsSubject: Subject<Budget[]> = new Subject();
  public transactions: Transaction[] = [];
  private transactionsSubject: Subject<Transaction[]> = new Subject();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.http = http;
    this.getBankAccountInfo();
    this.getBudgetInfo();
    this.getTransactionInfo();
  }

  getBankAccountInfo(): void {
    this.http
      .get<BankAccount[]>('http://localhost:8080/bankAccounts')
      .pipe(take(1))
      .subscribe({
        next: (bankAccounts) => {
          this.bankAccounts = bankAccounts;
          this.bankAccountsSubject.next(this.bankAccounts);
        },
        error: (err) => {
          this.snackBar.open(
            'Oops, Something went wrong Loading Bank Accounts!',
            undefined,
            {
              duration: 3000,
            }
          );
        },
      });
  }

  getBudgetInfo(): void {
    this.http
      .get<Budget[]>('http://localhost:8080/budgets')
      .pipe(take(1))
      .subscribe({
        next: (budgets) => {
          this.budgets = budgets;
          this.budgetsSubject.next(this.budgets);
        },
        error: (err) => {
          this.snackBar.open(
            'Oops, Something went wrong Loading Budgets!',
            undefined,
            {
              duration: 3000,
            }
          );
        },
      });
  }

  getTransactionInfo(): void {
    this.http
      .get<Transaction[]>('http://localhost:8080/transaction')
      .pipe(take(1))
      .subscribe({
        next: (transaction) => {
          this.transactions = transaction;
          this.transactionsSubject.next(this.transactions);
        },
        error: (err) => {
          this.snackBar.open(
            'Oops, Something went wrong Loading Transaction!',
            undefined,
            {
              duration: 3000,
            }
          );
        },
      });
  }

  putBudgetInfo(budget: Budget): void {
    const { id } = budget;

    this.http
      .put<Budget>(`http://localhost:8080/budgets/${id}`, budget)
      .pipe(take(1))
      .subscribe(() => this.getBudgetInfo());
  }

  putBankAccountInfo(bankAccount: BankAccount): void {
    // this line decontruscting bankAccounts object
    const { id } = bankAccount;
    console.log(bankAccount);

    this.http
      .put<BankAccount>(`http://localhost:8080/bankAccounts/${id}`, bankAccount)
      .pipe(take(1))
      .subscribe(() => this.getBankAccountInfo());
  }

  postBankAccountInfo(bankAccount: BankAccount): void {
    const { id } = bankAccount;

    this.http
      .post<BankAccount>(`http://localhost:8080/bankAccounts`, bankAccount)
      .pipe(take(1))
      .subscribe(() => this.getBankAccountInfo());
  }

  postBudgetInfo(budget: Budget): void {
    console.log(budget);

    this.http
      .post<Budget>(`http://localhost:8080/budgets`, budget)
      .pipe(take(1))
      .subscribe(() => this.getBudgetInfo());
  }

  postTransactionInfo(transaction: Transaction): void {
    this.http
      .post<Budget>(`http://localhost:8080/transaction`, transaction)
      .pipe(take(1))
      .subscribe(() => this.getTransactionInfo());
  }

  whenBankAccountsUpdated(): Observable<BankAccount[]> {
    return this.bankAccountsSubject.asObservable();
  }

  whenBudgetsUpdated(): Observable<Budget[]> {
    return this.budgetsSubject.asObservable();
  }

  whentransactionsUpdated(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  deleteBankAccountById(id: number): void {
    this.http
      .delete(`http://localhost:8080/bankAccounts/${id}`)
      .pipe(take(1))
      .subscribe(() => this.getBankAccountInfo());
  }

  deleteBudgetById(id: number): void {
    this.http
      .delete(`http://localhost:8080/budgets/${id}`)
      .pipe(take(1))
      .subscribe(() => this.getBudgetInfo());
  }

  deleteTransactionById(id: number): void {
    this.http
      .delete(`http://localhost:8080/transaction/${id}`)
      .pipe(take(1))
      .subscribe(() => this.getTransactionInfo());
  }
}
