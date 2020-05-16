import { Time } from '@angular/common';

export interface Event{
    event_id : number
    user_id :number;
    date : Date;
    start_time : Time;
    end_time : Time;
    type: string;
    discription : string;
    title : string;
    watch_platform : string;

}