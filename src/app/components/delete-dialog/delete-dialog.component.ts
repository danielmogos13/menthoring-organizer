import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrganizerService} from '../../services/organizerService/organizer.service';

@Component({
  selector: 'delete-task-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  type: string;
  title: string;
  deleteExpenseUrl: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: OrganizerService) { }

  ngOnInit() {

    this.title = this.data.title;
    this.type = this.data.type;
    this.deleteExpenseUrl =  'http://localhost:3000/money';
  }

  confirmDeleteTask () {
    this.dialogRef.close();

    this.tasksService.deleteTask(this.data.taskId);
  }


  confirmDeleteExpense () {

    this.tasksService.deleteExpense(this.data.expenseId, this.deleteExpenseUrl)
      .subscribe(result => {
        this.dialogRef.close(result);
    });
  }


}

