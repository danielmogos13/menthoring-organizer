import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OrganizerService} from '../../../services/organizerService/organizer.service';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'money-stats',
  templateUrl: './money-stats.component.html',
  styleUrls: ['./money-stats.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoneyStatsComponent implements OnInit {
  @Input() months: any;
  dateChangeEvent: any;
  date: any;
  title: string;
  moneyStatsData: any;

  constructor(private organizerService: OrganizerService) { }

  ngOnInit() {
    let monthStart: Date;
    let monthEnd;

    this.dateChangeEvent = this.organizerService.currentDate.subscribe(date => {

      this.date = date;

      let dateParts = date.split("/");
      let day = dateParts[0];
      let month = Number(dateParts[1]);
      let year = Number(dateParts[2]);

      monthStart = new Date(year, month - 1, 1);
      let totalMonthDays = new Date(year, month, 0).getDate();
      monthEnd = new Date(year, month - 1, totalMonthDays);
      monthEnd.setDate(monthEnd.getDate() + 1);

      this.title = this.months[month-1] + " " + year;


      this.initMonthlyTotalExpenses();

      this.initExpensesByCategory();

    });


    this.moneyStatsData = JSON.parse(localStorage.getItem('currentSettings'));


  }

  initMonthlyTotalExpenses = () => {
    let chart = Highcharts.chart('monthlyExpensesContainer', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 200,
        width: 200
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true
        }
      },
      // @ts-ignore
      series: [{
        'name': 'Percentage',
        'colorByPoint': true,
        'data': [{
          'name': 'Money left',
          'y': 61.41,
          'sliced': true,
          'selected': true
        }, {
          'name': 'Money spent',
          'y': 11.84
        }]
      }]

    });
  };

  initExpensesByCategory = () => {
    let chart = Highcharts.chart('categoryExpensesContainer', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 300,
        width: 200
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true
        }
      },
      // @ts-ignore
      series: [{
        'name': 'Percentage',
        'colorByPoint': true,
        'data': [
          {
            'name': 'Divertisment',
            'y': 61.41,
            'sliced': true,
            'selected': true
          },
          {
            'name': 'Masina',
            'y': 11.84
          },
          {
            'name': 'Mancare',
            'y': 11.84
          },
          {
            'name': 'Facturi',
            'y': 11.84
          },
          {
            'name': 'Rate banca',
            'y': 11.84
          }
        ]
      }]

    });
  }

}
