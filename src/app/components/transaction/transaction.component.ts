import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Transaction } from 'src/transactions';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  @Input() transaction: Transaction | null = null;
  transactionInfoForm: FormGroup;
  public editTransaction = false;

  constructor(private ui: UiService) {
    this.ui = ui;
    this.transactionInfoForm = new FormGroup({
      name: new FormControl(),
      total: new FormControl(),
      associatedDestination: new FormControl(),
    });
  }


  ngonInit(): void {}
}
