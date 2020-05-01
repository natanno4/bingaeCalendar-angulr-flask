import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';


@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styles: [ '.k-calendar { margin: 0 auto; }' ]
})


export class MonthlyCalendarComponent implements OnInit {


  public value: Date;
  public focusedDate: Date;
  constructor() { }


  ngOnInit(): void {
    this.value = new Date();
    this.focusedDate = new Date();
  }


  public onChange(date: Date): void {
    console.log(date.toString());
  }


}
