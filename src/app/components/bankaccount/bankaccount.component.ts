import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { BankAccount } from 'src/bankaccount';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.component.html',
  styleUrls: ['./bankaccount.component.css'],
})
export class BankaccountComponent {
  @Input() bankAccount: BankAccount | null = null;
  bankAccountInfoForm: FormGroup;
  public editBankAccount = false;
  public addABankAccount = false;

  constructor(private ui: UiService) {
    this.ui = ui;
    this.bankAccountInfoForm = new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      balance: new FormControl(),
    });
  }

  updateBankAccount(): void {
    const newBankAccount = {
      ...this.bankAccount,
      ...this.bankAccountInfoForm.value,
    };
    this.ui.putBankAccountInfo(newBankAccount);
    this.editBankAccount = true;
  }

  onDelete(): void {
    if (this.bankAccount === null) {
      console.log('no Account!');
    } else {
      if (this.bankAccount.id)
        this.ui.deleteBankAccountById(this.bankAccount.id);
    }
  }

  ngonInit(): void {}
}
