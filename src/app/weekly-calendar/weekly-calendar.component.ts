import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { EventsService } from '../events.service';
import { formatDate } from '@angular/common';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { NewEventDialogComponent } from '../dialogs/new-event-dialog/new-event-dialog.component';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit,OnChanges {

  hours : string[] = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00","15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00"];
  daysInWeek : number[] = [1,2,3,4,5,6,7];
  week  : string[] = []
  @Input() selectedDate: Date;
  weekRange : string = "";


  constructor(private eventsServic : EventsService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedDate == undefined || changes["selectedDate"].currentValue == changes["selectedDate"].previousValue)
    {
      return;
    }
    this.eventsServic.createWeekFromDay(this.selectedDate);
    this.weekRange = this.eventsServic.createWeekRange();
    this.setWeekdays()
  }


  setWeekdays(){
    this.week = []
    for(let date of this.eventsServic.week){
      this.week.push(formatDate(date, 'EEE, dd', 'en-US'))
    }
  }

  onEventClick(hour : string, day : number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px'
    let dayDate = this.eventsServic.week[day - 1];
    let dialogType, time = this.eventsServic.convertTimeFromString(hour);
    if(!this.eventsServic.checkIfEventExist(time, dayDate)){
      dialogType = NewEventDialogComponent;
      dayDate.setHours(time.getHours(),time.getMinutes());
      let endDate = new Date(dayDate);
      endDate.setHours(time.getHours() + 1);
      dialogConfig.data = {
        start : dayDate,
        end : endDate
      };
    } else{
      //TODO edit event dialog
    }

    const dialogRef =this.dialog.open(dialogType, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data =>{
        if(data["type"] == "addEvent"){
          let d = data["value"];
        } else{
          
        }
      }
    )
  }

  

}
