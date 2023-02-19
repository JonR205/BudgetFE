import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Budget } from 'src/budgets';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
})
export class BudgetsComponent {
  budgetInfoForm: FormGroup;
  public addABudget = false;

  public budgets: Budget[];
  private budgetsSubject: Subscription;
  constructor(private ui: UiService) {
    this.budgets = ui.budgets;
    const budgetsUpdatedEvent = ui.whenBudgetsUpdated();
    this.budgetsSubject = budgetsUpdatedEvent.subscribe(
      (budgets) => (this.budgets = budgets)
    );
    this.budgetInfoForm = new FormGroup({
      budgetname: new FormControl(),
      total: new FormControl(),
      associatedDestination: new FormControl(),
    });
  }

  addBudget(): void {
    console.log(this.budgetInfoForm.value);
    const newBudget = new Budget(
      this.budgetInfoForm.value.budgetname,
      this.budgetInfoForm.value.total,
      this.budgetInfoForm.value.associatedDestination
    );
    this.ui.postBudgetInfo(newBudget);
    this.addABudget = false;
  }

  ngOnInit(): void {}
}
