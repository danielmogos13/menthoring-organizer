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
  deleteIsLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private tasksService: OrganizerService) { }

  ngOnInit() {

    this.title = this.data.title;
    this.type = this.data.type;
  }

  confirmDeleteTask () {
    this.dialogRef.close("success");
    this.deleteIsLoading = true;

    this.tasksService.deleteTask(this.data.taskId).then((result) => {
      this.deleteIsLoading = false;
    });
  }


  confirmDeleteExpense () {

    this.deleteIsLoading = true;
    this.tasksService.deleteExpense(this.data.expenseId)
      .subscribe(result => {
          this.deleteIsLoading = false;
          this.dialogRef.close('success');
        },
        (error) => {
          this.deleteIsLoading = false;
        });
  }


}

