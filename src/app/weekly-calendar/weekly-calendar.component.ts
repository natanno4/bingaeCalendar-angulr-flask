import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css']
})
export class WeeklyCalendarComponent implements OnInit {

  hours : string[] = ["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00", "10:00", "11:00", "12:00", "13:00",
  "14:00","15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00"];
  daysInWeek : number[] = [1,2,3,4,5,6,7];
  hoursSplit : number[] = [1,2];
  week  : string[] = ["Mon, 18", "Tue, 19", "Wed, 20","Thu, 21", "Fri, 22", "Sat, 23","Sun, 24"]

  constructor() { }

  ngOnInit(): void {
  }


}
