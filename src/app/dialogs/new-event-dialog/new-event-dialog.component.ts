import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.css']
})
export class NewEventDialogComponent implements OnInit {
  form: FormGroup
  startDate: Date;
  endDate: Date;

  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.endDate= data.end;
      this.startDate = data.start;
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title :[''],
      type : [''],
      startDate : [this.startDate],
      endDate: [this.endDate],
      startTime :[formatDate(this.startDate, "HH:mm",'en-US')],
      endTime :[formatDate(this.endDate, "HH:mm",'en-US')]
  });
  }

  save() {
    this.dialogRef.close({"type": "addEvent","value":this.form.value});
}

close() {
    this.dialogRef.close();
}

}
