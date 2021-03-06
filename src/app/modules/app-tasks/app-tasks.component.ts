import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TasksDialogComponent} from '../../components/tasks-dialog/tasks-dialog.component';
import {MatSnackBar} from '@angular/material';
import {ActionPerformedComponent} from '../../components/action-performed/action-performed.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './app-tasks.component.html',
  styleUrls: ['./app-tasks.component.scss']
})
export class AppTasksComponent implements OnInit {

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  addTask () {

    const taskToAdd = {
      name: "",
      description: "",
      date: null,
      location: ""
    };
    const dialogRef = this.dialog.open(TasksDialogComponent, {
      width: '450px',
      data: {
        operation: 'add',
        task: taskToAdd
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success'){
        this.openSnackBar("Task created");
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

}
