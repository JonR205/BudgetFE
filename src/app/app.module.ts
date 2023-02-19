import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BankaccountComponent } from './components/bankaccount/bankaccount.component';
import { BankaccountsComponent } from './components/bankaccounts/bankaccounts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BudgetComponent } from './components/budget/budget.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    BankaccountComponent,
    BankaccountsComponent,
    DashboardComponent,
    BudgetComponent,
    BudgetsComponent,
    TransactionComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
