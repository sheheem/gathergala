import { Component, OnInit } from '@angular/core';
import { iEvent } from 'src/app/model/event.interface';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: iEvent[]= []

  // getCurrentDate(): Date {
  //   const currentDate = new Date()
  //   currentDate.toLocaleDateString
  //   console.log(currentDate);
    
  //   return currentDate;
  // }

  constructor(private _userService: UserService, private _route: Router) {}

  ngOnInit(): void {
   this._userService.findAllEvents().subscribe({
        next: (response) => {
          this.events = response.event
          console.log(this.events);
          
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  viewDetail(eventId) {
    this._route.navigate(['/event-detail', eventId])
  }


}
