import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TasksDialogComponent } from '../tasks-dialog/tasks-dialog.component'
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component'
import {ITasks} from '../../interfaces/ITasks';
import {OrganizerService} from '../../services/organizerService/organizer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActionPerformedComponent } from '../action-performed/action-performed.component';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasks: ITasks[];
  @Input() classProperty: string;

  constructor(private dialog: MatDialog, private tasksService: OrganizerService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  editTask (taskId) {
    let taskToEdit;

    for(let index = 0; index < this.tasks.length; index++){
      if(this.tasks[index].id === taskId){
        taskToEdit = this.tasks[index];
        break;
      }
    }

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      width: '450px',
      data: {
        operation: 'edit',
        task: taskToEdit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success'){
        this.openSnackBar("Task edited");
      }
    });

  }

  deleteTask (taskId) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        type: 'deleteTask',
        title: 'Delete task',
        taskId: taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "success"){
        console.log('The dialog was closed');

        this.openSnackBar("Task has been deleted");
      }

    })
  }

  changeTaskStatus (taskId, paused) {
    this.tasksService.changeTaskStatus(taskId, paused).then(param => {
      this.openSnackBar('Status has been changed');
    });
  }

  copyTask (task) {

    const taskToAdd = {
      name: task.name,
      description: task.description,
      date: null,
      location: task.location
    };
    const dialogRef = this.dialog.open(TasksDialogComponent, {
      width: '450px',
      data: {
        operation: 'add',
        task: taskToAdd
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === "success") {
        console.log('The dialog was closed');

        this.openSnackBar("Task copied");
      }

    })

  }

  openSnackBar(text) {
    this._snackBar.openFromComponent(ActionPerformedComponent, {
      data: { message: text },
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  checkDate (task) {

    let currentDate = new Date();
    let currentTime = currentDate.setHours(0, 0, 0, 0);
    let taskDate = task.date.toDate().getTime();


    if(currentTime > taskDate && task.stopped){
      return 'access_alarms'
    }

   if(currentTime > taskDate && !task.stopped){
     return 'done_all'
   }

   if(currentTime < taskDate && task.stopped){
     return 'error'
   }

    if(currentTime < taskDate && !task.stopped){
      return 'forward'
    }

  }

  getTitle (task) {
    let itemClass = this.checkDate(task);

    if(itemClass === 'access_alarms'){
      return 'Overdue'
    }

    if(itemClass === 'done_all'){
      return 'Done'
    }

    if(itemClass === 'error'){
      return 'Paused'
    }

    if(itemClass === 'forward'){
      return 'In progress'
    }

  }

}
