import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Transaction } from 'src/transactions';
import { FormControl, FormGroup } from '@angular/forms';
import { BankAccount } from 'src/bankaccount';
import { Budget } from 'src/budgets';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

interface DisplayTransaction {
  sourceOrDestination: string;
  amount: number;
  bankName: string;
  budgetName: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];

  sortedData: DisplayTransaction[];

  transactionInfoForm: FormGroup;
  public addATransaction = false;
  public viewtransactions = false;

  public bankAccounts: BankAccount[];
  private bankAcountsSubject: Subscription;
  public budgets: Budget[];
  private budgetSubject: Subscription;

  private transactionsSubject: Subscription;
  constructor(private ui: UiService, private snackBar: MatSnackBar) {
    this.bankAccounts = ui.bankAccounts;
    this.budgets = ui.budgets;
    this.transactions = ui.transactions;
    this.sortedData = this.mapTrastions();

    const bankccountsUpdatedEvent = ui.whenBankAccountsUpdated();
    const budgetUpdatedEvent = ui.whenBudgetsUpdated();
    this.bankAcountsSubject = bankccountsUpdatedEvent.subscribe(
      (bankccounts) => (this.bankAccounts = bankccounts)
    );
    this.budgetSubject = budgetUpdatedEvent.subscribe(
      (budgets) => (this.budgets = budgets)
    );

    const transactionsUpdatedEvent = ui.whentransactionsUpdated();
    this.transactionsSubject = transactionsUpdatedEvent.subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.sortedData = this.mapTrastions();
      }
    );

    this.transactionInfoForm = new FormGroup({
      destination: new FormControl(),
      transactionAmount: new FormControl(),
      bankName: new FormControl(),
      budgetName: new FormControl(),
    });
  }

  // addTransaction(): void {
  //   const matchedBudget = this.budgets.find(
  //     ({ budgetname }) =>
  //       this.transactionInfoForm.value.budgetName === budgetname
  //   );
  //   const matchedBankAccount = this.bankAccounts.find(
  //     ({ name }) => this.transactionInfoForm.value.bankName === name
  //   );

  //   if (matchedBankAccount?.id && matchedBudget?.id) {
  //     const newTransaction = new Transaction(
  //       this.transactionInfoForm.value.destination,
  //       this.transactionInfoForm.value.transactionAmount,
  //       matchedBudget.id,
  //       matchedBankAccount.id
  //     );
  //     this.ui.postTransactionInfo(newTransaction);
  //     this.addATransaction = false;
  //     matchedBankAccount.balance =
  //       matchedBankAccount.balance - newTransaction.amount;
  //     this.ui.putBankAccountInfo(matchedBankAccount);
  //     matchedBudget.total = matchedBudget.total - newTransaction.amount;
  //     const associatedDestination = matchedBudget.associatedDestination.find(
  //       (ad) => ad === newTransaction.sourceOrDestination
  //     );
  //     if (!associatedDestination) {
  //       matchedBudget.associatedDestination.push(
  //         newTransaction.sourceOrDestination
  //       );
  //     }
  //     this.ui.putBudgetInfo(matchedBudget);
  //   } else {
  //     this.snackBar.open('Could not match Bank or Budget name!', undefined, {
  //       duration: 3000,
  //     });
  //   }
  // }

  ngOnInit(): void {}
  sortData(sort: Sort) {
    const data = this.mapTrastions();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'sourceOrDestination':
          return compare(a.sourceOrDestination, b.sourceOrDestination, isAsc);
        case 'amount':
          return compare(a.amount, b.amount, isAsc);
        case 'budget':
          return compare(a.budgetName, b.budgetName, isAsc);
        case 'bank':
          return compare(a.bankName, b.bankName, isAsc);
        default:
          return 0;
      }
    });
  }

  mapTrastions() {
    return this.transactions.map((transaction) => {
      const bankName =
        this.bankAccounts.find(({ id }) => id === transaction.bankId)?.name ??
        '';
      const budgetName =
        this.budgets.find(({ id }) => id === transaction.budgetId)
          ?.budgetname ?? '';

      const displayTransaction: DisplayTransaction = {
        sourceOrDestination: transaction.sourceOrDestination,
        amount: transaction.amount,
        bankName: bankName,
        budgetName: budgetName,
      };

      return displayTransaction;
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
