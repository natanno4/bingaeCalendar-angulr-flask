import { Injectable } from '@angular/core';
import { getLocaleFirstDayOfWeek, WeekDay, formatDate, Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import{Event} from './models/event'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  week : Date[] = [];
  events : Event[] = [];

  constructor(private http: HttpClient) { }

  createWeekFromDay(date: Date) {
    let firstDay = this.getFirstDayOFTheWeek(date);
    var nextDay = new Date(firstDay);
    let daysArr = [];
    daysArr.push(nextDay);
    for(let i = 1; i < 7; i++){
      nextDay = new Date(nextDay);
      nextDay.setDate(nextDay.getDate()+1);
      daysArr.push(nextDay)
    }
    this.week = daysArr;
      
  }

  createWeekRange() : string{
    if (this.week.length == 0){return ""}
    let startWeek = this.week[0], endWeek = this.week[this.week.length - 1];
    let startYear = startWeek.getFullYear();
    let  endYear = endWeek.getFullYear();
    if (startYear == endWeek.getFullYear()){
      return `${formatDate(startWeek, 'dd  MMM', 'en-US')} - ${formatDate(endWeek, 'dd  MMM', 'en-US')} ${startYear}`
    } else{
      return `${formatDate(startWeek, 'dd  MMM', 'en-US')} - ${formatDate(endWeek, 'dd  MMM', 'en-US')} ${startYear}/${endYear}`
    }
  }

  private getFirstDayOFTheWeek(date : Date) : Date{
    let d = new Date(date);
    let day = d.getDay(); 
    if (day == 0){
      return date;
    }
    let diff = d.getDate() - day + (day == 0 ? -6 : 0);
    return new Date(d.setDate(diff));
  }

  getWeeklyEvents() : Observable<Event[]>{
    return ;
  }

  checkIfEventExist(time : Date, day : Date) : boolean{
    for(let event of this.events){
      if(event.start_date_time.getHours() <= time.getHours() && event.start_date_time.getMinutes() <= time.getMinutes()
      && event.end_date_time.getHours() >= time.getHours()  && event.end_date_time.getMinutes() >= time.getMinutes()){
        return true;
      }
    }
    return false;
  }


  convertTimeFromString(timeString : string):Date{
    let timeTokens = timeString.split(':');
    let date = new Date();
    date.setHours(parseInt(timeString[0], 10), parseInt(timeString[1], 10));
    return date
  }
}
