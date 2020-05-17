import { Time } from '@angular/common';

export interface Event{
    event_id : number
    user_id :number;
    start_date : Date;
    end_date : Date;
    start_time : Time;
    end_time : Time;
    type: string;
    discription : string;
    title : string;
    watch_platform : string;

}