import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iEvent } from 'src/app/model/event.interface';
import { iTicket } from 'src/app/model/ticket.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketDetail.component.html',
  styleUrls: ['./ticketDetail.component.css'],
  

})
export class TicketDetailComponent implements OnInit {
  @Output() quantities = new EventEmitter<{quantity:number,price:number}>();
  @Output() unToggleButtonEvent = new EventEmitter<boolean>();

  @Input() eventId: string;
  @Input() ticket: iTicket;
  showButton:boolean = true;
  quantity: number = 1;
  event: iEvent;
 
  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = this._route.snapshot.paramMap.get('id')
  }

  toggle() {
    this.unToggleButtonEvent.emit()    
    this.showButton = !this.showButton;
    if(!this.showButton) {
      this.quantities.emit({quantity:this.quantity,price:this.ticket.ticketPrice})
    }
  }

  changeEvent(){
    this.quantities.emit({quantity:this.quantity,price:this.ticket.ticketPrice})
  }

  toggleShowButton(){
    this.showButton = true
  }

}
