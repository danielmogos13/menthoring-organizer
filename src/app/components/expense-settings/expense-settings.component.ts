import {Component, IterableDiffers, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizerService} from '../../services/organizerService/organizer.service';
import {MatChipInputEvent, MatDialogRef} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'expense-settings',
  templateUrl: './expense-settings.component.html',
  styleUrls: ['./expense-settings.component.scss']
})
export class ExpenseSettingsComponent implements OnInit {
  formExpenseSettings: any;
  monthDays: any = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  expenseCategories: any;
  totalExpenses: any;
  saveIsLoading: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  constructor(private organizerService: OrganizerService, public dialogRef: MatDialogRef<ExpenseSettingsComponent>) { }

  ngOnInit() {

    this.expenseCategories = [];

    for(let index = 0; index < 31; index++) {
      this.monthDays.push(index+1);
    }

    this.formExpenseSettings = new FormGroup({
      monthlyIncome: new FormControl(0, Validators.minLength(2)),
      monthStart: new FormControl("", Validators.minLength(2)),
      monthEnd: new FormControl("", Validators.minLength(2)),
    });

    this.organizerService.getSettings().subscribe(data => {
      let settings = data.settings[0];

      this.formExpenseSettings.patchValue({
        monthlyIncome: settings.monthlyIncome,
        monthStart: settings.monthStart,
        monthEnd: settings.monthEnd
      });

      this.expenseCategories = this.expenseCategories.concat(data.categories);
      this.totalExpenses = settings.totalExpenses;

      this.onFormChanges();
    });

  }

  saveSettings () {

    const settings = {
      monthlyIncome: this.formExpenseSettings.value.monthlyIncome,
      monthStart: this.formExpenseSettings.value.monthStart,
      monthEnd: this.formExpenseSettings.value.monthEnd,
      expenseCategories: this.expenseCategories,
      totalExpenses: this.totalExpenses
    };

    this.saveIsLoading = true;
    this.organizerService.saveSettings(settings).subscribe((result) => {
        this.saveIsLoading = false;
        this.dialogRef.close('success');
      },
      (error) => {
        this.saveIsLoading = false;
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const maxLength = 10;

    let exists = this.expenseCategories.find(obj => obj.name === value);
    let categoriesLength = this.expenseCategories.length;

    if ((value || '').trim() && !exists && categoriesLength < maxLength) {
      this.expenseCategories.push({name: value.trim()});
      this.dialogRef.disableClose = true;
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.expenseCategories.indexOf(fruit);

    if (index >= 0) {
      this.expenseCategories.splice(index, 1);
    }
    this.dialogRef.disableClose = true;
  }

  onFormChanges() {
    this.formExpenseSettings.valueChanges.subscribe(val => {
      this.dialogRef.disableClose = true;
    });
  }
}
