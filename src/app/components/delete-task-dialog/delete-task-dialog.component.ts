import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TasksService} from '../../services/tasksService/tasks.service';

@Component({
  selector: 'delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss']
})
export class DeleteTaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: TasksService) { }

  ngOnInit() {

  }

  confirmDelete () {
    this.dialogRef.close();

    this.tasksService.deleteTask(this.data.taskId).then(param => {

    });
  }

}

