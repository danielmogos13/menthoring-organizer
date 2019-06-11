import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ITasks } from '../../interfaces/ITasks';
import { TasksService } from '../../services/tasksService/tasks.service'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createCheckers} from "ts-interface-checker";
import ITasksTI from  '../../interfaces/ITasks-ti';

@Component({
  selector: 'tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.scss']
})
export class TasksDialogComponent implements OnInit {
  task: ITasks;
  operation: string;
  hours: any;
  selectedHour: Number;
  formTask: any;

  constructor(
    public dialogRef: MatDialogRef<TasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private tasksService: TasksService) { }

  ngOnInit() {

    this.task = Object.assign({}, this.data.task);
    this.operation = this.data.operation;
    this.hours = [];

    // @ts-ignore
    this.task.date = this.task.date ?  this.task.date.toDate() : new Date();

    // @ts-ignore
    this.selectedHour = this.task.date.getHours();

    for(let index = 0; index < 24; index++){
      let hour = {
        viewValue: index < 10 ? "0" + index + ":00": index + ":00",
        value: index
      };

      this.hours.push(hour);
    }

    this.formTask = new FormGroup({
      taskName: new FormControl(this.task.name, Validators.minLength(2)),
      taskDescription: new FormControl(this.task.description, Validators.minLength(2)),
      taskLocation: new FormControl(this.task.location, Validators.minLength(5)),
      taskDate: new FormControl(this.task.date, Validators.required),
      selectHour: new FormControl(this.selectedHour, Validators.minLength(2))
    });

  }

  saveTask () {

    let taskDate = this.formTask.value.taskDate;

    // @ts-ignore
    taskDate.setHours(this.formTask.value.selectHour, 0, 0, 0);
    // @ts-ignore
    this.task = {
      id: this.task.id,
      name: this.formTask.value.taskName,
      description: this.formTask.value.taskDescription,
      date: taskDate,
      location: this.formTask.value.taskLocation,
      stopped: this.task.stopped
    };

    const {ITasks} = createCheckers(ITasksTI);

    ITasks.strictCheck(this.task);

    this.dialogRef.close('success');
    this.tasksService.saveTask(this.task).then(param => {

    });
  }

  addTask () {
    let taskDate = this.formTask.value.taskDate;

    // @ts-ignore
    taskDate.setHours(this.formTask.value.selectHour, 0, 0, 0);
    let userId = JSON.parse(localStorage.getItem('currentUser')).uid;

    // @ts-ignore
    this.task = {
      userId: userId,
      name: this.formTask.value.taskName,
      description: this.formTask.value.taskDescription,
      date: taskDate,
      location: this.formTask.value.taskLocation,
      stopped: false,
    };

    const {ITasks} = createCheckers(ITasksTI);

    ITasks.strictCheck(this.task);
    this.dialogRef.close('success');
    this.tasksService.addTask(this.task).then(param => {

    });

  }

}
