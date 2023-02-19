import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Budget } from 'src/budgets';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent {
  @Input() budget: Budget | null = null;
  budgetInfoForm: FormGroup;
  public editBudget = false;

  constructor(private ui: UiService) {
    this.ui = ui;
    this.budgetInfoForm = new FormGroup({
      budgetname: new FormControl(),
      total: new FormControl(),
      associatedDestination: new FormControl(),
    });
  }

  updateBudget(): void {
    console.log(this.budgetInfoForm.value);
    const newBudget = {
      ...this.budget,
      ...this.budgetInfoForm.value,
    };
    this.ui.putBudgetInfo(newBudget);
    this.editBudget = true;
  }

  onDelete(): void {
    if (this.budget === null) {
      console.log('no Account!');
    } else {
      if (this.budget.id) this.ui.deleteBudgetById(this.budget.id);
    }
  }

  ngonInit(): void {}
}
