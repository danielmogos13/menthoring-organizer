import {Component, Input, OnInit} from '@angular/core';
import {TasksService} from '../../../services/tasksService/tasks.service';
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
  selector: 'tasks-stats',
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.scss']
})
export class TasksStatsComponent implements OnInit {
  @Input() months: any;

  dateChangeEvent: any;
  date: any;
  stoppedTasks: Number = 0;
  completedTasks: Number = 0;

  public options: any = {
    chart: {
      type: 'bar',
      height: 300,
      width: 200
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['']
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    credits: {
      enabled: false
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [
      {
        name: 'Completed',
        data: [5]
      },
      {
        name: 'Paused',
        data: [5]
      }
    ]
  };


  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    let monthStart: Date;
    let monthEnd;


    let currentDate = new Date();
    let currentTime = currentDate.setHours(0, 0, 0, 0);

    this.dateChangeEvent = this.tasksService.currentDate.subscribe(date => {


      if(date !== 'date'){
        this.date = date;

        let dateParts = date.split("/");
        let day = dateParts[0];
        let month = Number(dateParts[1]);
        let year = Number(dateParts[2]);

        monthStart = new Date(year, month - 1, 1);
        let totalMonthDays = new Date(year, month, 0).getDate();
        monthEnd = new Date(year, month - 1, totalMonthDays);
        monthEnd.setDate(monthEnd.getDate() + 1);

        this.tasksService.getMonthlyStats(monthStart, monthEnd).subscribe(tasks => {
          this.stoppedTasks = 0;
          this.completedTasks = 0;

          for(var index = 0; index < tasks.length; index++){

            // @ts-ignore
            let taskDate = tasks[index].date.toDate().getTime();

            if(taskDate < currentTime){

              if(tasks[index].stopped){
                // @ts-ignore
                this.stoppedTasks++;
              }else {
                // @ts-ignore
                this.completedTasks++;
              }
            }

          }


          this.options.title.text = this.months[month-1] + " " + year;

          this.options.series[0].data[0] = this.completedTasks;
          this.options.series[1].data[0] = this.stoppedTasks;

          let element = document.getElementById('statsGraphContainer');
          Highcharts.chart(element, this.options);
        });


      }
    });


  }

  ngOnDestroy() {
    this.dateChangeEvent.unsubscribe();
  }

}
