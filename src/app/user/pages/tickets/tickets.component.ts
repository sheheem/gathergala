import { Component, Input, OnInit, ViewChild, ViewChildren,QueryList} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from 'src/app/model/event.interface';
import { iTicket } from 'src/app/model/ticket.interface';
import { UserService } from '../../services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { TicketDetailComponent } from './tickeDetail.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  @Input() eventId: string;
  event: iEvent;
  tickets: iTicket[];
  quantities: number;
  newPrice: number;
  hideToggle: boolean;
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false

@ViewChildren(TicketDetailComponent) childRef!: QueryList<TicketDetailComponent>

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.eventId = this._route.snapshot.paramMap.get('id');
    this.isloading = true
    this._userService.findEventById(this.eventId).subscribe({
      next: (response) => {
        this.isloading = false
        this.event = response.eventDetail;
        this.tickets = this.event.tickets;
        this.tickets.forEach((t, i) => {
          this.quantities = 0;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReceivedQuantities(object:{quantity: number,price:number}) {
    this.quantities = object.quantity
    this.newPrice = object.price

  }

  total(): number {
    return this.quantities * this.newPrice
  }
  
  onRecievedToggleEvent(){
    this.childRef.forEach((ticketDetailComponent:TicketDetailComponent)=>{
      ticketDetailComponent.toggleShowButton()
    })
  }
}
