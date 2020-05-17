import { Time } from '@angular/common';

export interface Event{
    event_id : number
    user_id :number;
    start_date_time : Date;
    end_date_time : Date;
    type: string;
    discription : string;
    title : string;
    watch_platform : string;

}