import { Component, OnInit, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styles: [ '.k-calendar { margin: 0 auto; }' ]
})


export class MonthlyCalendarComponent implements OnInit {


  public value: Date;
  public focusedDate: Date;

  @Output() dateToEmit = new EventEmitter<Date>();
  constructor() { }


  ngOnInit(): void {
    this.value = new Date();
    this.focusedDate = new Date();
    this.dateToEmit.emit(this.value);

  }


  public onChange(date: Date): void {
    this.dateToEmit.emit(date);
  }


}
