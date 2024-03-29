import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';
import { iVendorProfile } from 'src/app/model/profile.model';
import { iEvent } from 'src/app/model/event.interface';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  vendorId: string;
  events: iEvent[]=[];
  event: iEvent;

  constructor(private _vendorService: VendorService, private _router: Router, private _title: Title){}

ngOnInit(): void {
  this._title.setTitle('Manage Events')
    this._vendorService.profile().subscribe({
      next: (response) => {
        console.log(response);
        this.vendorId = response.profile._id
        this.call(this.vendorId);
      },
      error: (err) => {
        console.log(err);
      }
    })
}

call(id) {
  this._vendorService.eventsHosted(id).subscribe({
    next: (response) => {
      console.log(response.events);
      this.events = response.events
    },
    error: (err) => {
      console.log(err);
    }
  })
}

viewDetail(eventId) {
  this._router.navigate(['/vendor/edit_event', eventId])
}

deleteEvent(eventId) {
  this._vendorService.deleteEvent(eventId).subscribe({
    next: (response) => {
      console.log("Event deleted successfully");
      this._vendorService.eventsHosted(this.vendorId).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      })
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
