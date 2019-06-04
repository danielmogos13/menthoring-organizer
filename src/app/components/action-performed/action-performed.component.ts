import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'action-performed',
  templateUrl: './action-performed.component.html',
  styleUrls: ['./action-performed.component.scss']
})
export class ActionPerformedComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private snackBarData: any ) { }

  ngOnInit() {
    this.message = this.snackBarData.message;
  }

}
