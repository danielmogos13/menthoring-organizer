import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizerService} from '../../services/organizerService/organizer.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'expense-settings',
  templateUrl: './expense-settings.component.html',
  styleUrls: ['./expense-settings.component.scss']
})
export class ExpenseSettingsComponent implements OnInit {
  formExpenseSettings: any;
  monthDays: any = [];

  constructor(private organizerService: OrganizerService, public dialogRef: MatDialogRef<ExpenseSettingsComponent>) { }

  ngOnInit() {

    const url = 'http://localhost:3000/settings';

    for(let index = 0; index < 31; index++) {
      this.monthDays.push(index+1);
    }

    this.formExpenseSettings = new FormGroup({
      monthlyIncome: new FormControl(0, Validators.minLength(2)),
      monthStart: new FormControl("", Validators.minLength(2)),
      monthEnd: new FormControl("", Validators.minLength(2)),
    });

    this.organizerService.getSettings(url).subscribe(item => {
      this.formExpenseSettings.patchValue({
        monthlyIncome: item.monthlyIncome,
        monthStart: item.monthStart,
        monthEnd: item.monthEnd
      });
    })
  }

  saveSettings () {
    const url = 'http://localhost:3000/settings';

    const settings = {
      monthlyIncome: this.formExpenseSettings.value.monthlyIncome,
      monthStart: this.formExpenseSettings.value.monthStart,
      monthEnd: this.formExpenseSettings.value.monthEnd,
    };

    this.organizerService.saveSettings(url, settings).subscribe( (result) => {
      this.dialogRef.close("success");
    });
  }

}
