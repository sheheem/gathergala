import { Component, Input, OnInit, ViewChild, ViewChildren,QueryList} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iEvent } from 'src/app/model/event.interface';
import { iTicket } from 'src/app/model/ticket.interface';
import { UserService } from '../../services/user.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { TicketDetailComponent } from './tickeDetail.component';
import { environment } from 'src/environments/environment';

declare var Stripe;

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
  ticketId: string;
  userId: string
  ticketName: string;
  stripe: any;
  totalPrice: number;
  ticketPrice: number;


  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false

@ViewChildren(TicketDetailComponent) childRef!: QueryList<TicketDetailComponent>

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.stripe = Stripe(environment.stripe_key);
    console.log(this.stripe);
    
    this.eventId = this._route.snapshot.paramMap.get('id');
    this._userService.profile().subscribe({
      next: (response) => {
        console.log(response);
        
        this.userId = response.profile._id
        console.log(this.userId);
        
      }
    })
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

  onReceivedQuantities(object:{quantity: number,price:number, id: string, type: string}) {
    this.quantities = object.quantity 
    this.newPrice = object.price + 25
    this.ticketId = object.id
    this.ticketName = object.type
  }

  total(): number {
    this.totalPrice = this.quantities * this.newPrice 
    return this.totalPrice
  }
  
  onRecievedToggleEvent(){
    this.childRef.forEach((ticketDetailComponent:TicketDetailComponent)=>{
      ticketDetailComponent.toggleShowButton()
    })
  }

  onSubmit() {
    const ticketCheckOut = {
      userId: this.userId,
      eventId: this.eventId,
      ticketId: this.ticketId,
      ticketPrice: this.newPrice,
      totalTickets: this.quantities,
      totalPrice: this.totalPrice,
      ticketType: this.ticketName,
      eventName: this.event.eventName
    }

    console.log(ticketCheckOut.ticketPrice);
    
    this._userService.orderProcess(ticketCheckOut).subscribe((res) => {
      console.log(res);
      this.stripe.redirectToCheckout({
        sessionId: res.sessionId
      })
    })
    
  }
}
