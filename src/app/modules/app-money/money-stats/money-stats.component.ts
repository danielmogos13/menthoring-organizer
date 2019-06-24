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
  expenseCategories: any;
  totalExpenses: any;
  userSettings: any;

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

      this.expenseCategories = JSON.parse(localStorage.getItem('expensesByCategory'));
      this.totalExpenses = JSON.parse(localStorage.getItem('totalExpenses'));
      this.userSettings = JSON.parse(localStorage.getItem('currentSettings'));

      this.initMonthlyTotalExpenses();
      this.initExpensesByCategory();

    });

  }

  initMonthlyTotalExpenses = () => {
    let moneySpent = Number(this.totalExpenses);
    let monthlyIncome =  Number(this.userSettings.monthlyIncome);
    let moneyLeft = monthlyIncome - moneySpent;

    let moneySpentPercentage = ((moneySpent * 100) / monthlyIncome).toFixed(2);
    let moneyLeftPercentage = ((moneyLeft * 100) / monthlyIncome).toFixed(2);

    let chart = Highcharts.chart('monthlyExpensesContainer', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 200,
        width: 200
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Amount: <b>{point.z}</b><br/>' +
          'Percentage: <b>{point.y}</b><br/>'
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
          'y': Number(moneyLeftPercentage),
          "z": moneyLeft,
          'sliced': true,
          'selected': true
        }, {
          'name': 'Money spent',
          'y': Number(moneySpentPercentage),
          "z": moneySpent
        }]
      }]

    });
  };

  initExpensesByCategory = () => {
    let categoriesChartData = [];

    let moneySpent = Number(this.totalExpenses);

    for (let index = 0; index < this.expenseCategories.length; index++) {

      let moneySpentPercentage = ((this.expenseCategories[index].total * 100) / moneySpent).toFixed(2);

      let currentItem = {
        name: this.expenseCategories[index].name,
        z: this.expenseCategories[index].total,
        y: Number(moneySpentPercentage)
      };
      categoriesChartData.push(currentItem);
    }

    categoriesChartData[0].sliced = true;
    categoriesChartData[0].selected = true;

    let chart = Highcharts.chart('categoryExpensesContainer', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 300,
        width: 200
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Amount: <b>{point.z}</b><br/>' +
          'Percentage: <b>{point.y}</b><br/>'
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
        'data': categoriesChartData
      }]

    });
  }

}
