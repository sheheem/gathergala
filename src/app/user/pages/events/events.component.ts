import { Component, OnInit } from '@angular/core';
import { iEvent } from 'src/app/model/event.interface';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: iEvent[]= []
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false


  // getCurrentDate(): Date {
  //   const currentDate = new Date()
  //   currentDate.toLocaleDateString
  //   console.log(currentDate);
    
  //   return currentDate;
  // }

  constructor(private _userService: UserService, private _route: Router, private _title: Title) {}

  ngOnInit(): void {
    this._title.setTitle('Events')
    this.isloading=true
   this._userService.findAllEvents().subscribe({
        next: (response) => {
          this.isloading=false
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
