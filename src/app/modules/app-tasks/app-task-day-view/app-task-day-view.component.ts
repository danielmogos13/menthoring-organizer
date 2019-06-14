import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasksService/tasks.service';
import { ITasks } from '../../../interfaces/ITasks';
import { LoadingSpinnerService } from '../../../services/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-task-day-view',
  templateUrl: './app-task-day-view.component.html',
  styleUrls: ['./app-task-day-view.component.scss']
})
export class AppTaskDayViewComponent implements OnInit {
  date: string;
  tasks: ITasks[];
  dateChangeEvent: any;
  isLoading: boolean;

  constructor(private tasksService: TasksService, private loadingSpinner: LoadingSpinnerService) { }

  ngOnInit() {
    this.loadingSpinner.isLoading.subscribe(loading => {
      this.isLoading = loading
    });

    this.dateChangeEvent = this.tasksService.currentDate.subscribe(date => {
      this.date = date;

      this.loadingSpinner.show();
       this.tasksService.getDayTasks(date).subscribe(tasks => {
        this.tasks = [];
        for(let index = 0; index < tasks.length; index++) {
          // @ts-ignore
          let dataItem = tasks[index].payload.doc.data();
          dataItem.id = tasks[index].payload.doc.id;

          this.tasks.push(dataItem);
        }

         this.loadingSpinner.hide();
      });

    });
  }

  ngOnDestroy() {
    if(this.dateChangeEvent) {
      this.dateChangeEvent.unsubscribe();
    }
  }
}
