import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'money-stats',
  templateUrl: './money-stats.component.html',
  styleUrls: ['./money-stats.component.scss']
})
export class MoneyStatsComponent implements OnInit {
  @Input() months: any;

  constructor() { }

  ngOnInit() {
  }

}
