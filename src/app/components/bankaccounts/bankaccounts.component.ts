import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { BankAccount } from 'src/bankaccount';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-bankaccounts',
  templateUrl: './bankaccounts.component.html',
  styleUrls: ['./bankaccounts.component.css'],
})
export class BankaccountsComponent {
  bankAccountInfoForm: FormGroup;
  public addABankAccount = false;

  public bankAccounts: BankAccount[];
  private bankAcountsSubject: Subscription;
  constructor(private ui: UiService) {
    this.bankAccounts = ui.bankAccounts;
    const bankccountsUpdatedEvent = ui.whenBankAccountsUpdated();
    this.bankAcountsSubject = bankccountsUpdatedEvent.subscribe(
      (bankccounts) => (this.bankAccounts = bankccounts)
    );
    this.bankAccountInfoForm = new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      balance: new FormControl(),
    });
  }

  addBankAccount(): void {
    console.log(this.bankAccountInfoForm.value);
    const newBankAccount = new BankAccount(
      this.bankAccountInfoForm.value.name,
      this.bankAccountInfoForm.value.type,
      this.bankAccountInfoForm.value.balance
    );
    this.ui.postBankAccountInfo(newBankAccount);
    this.addABankAccount = false;
  }

  ngOnInit(): void {}
}
