import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate : Date;

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedDate(date : Date){
      this.selectedDate = date;
  }

}
