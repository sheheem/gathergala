import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private vendorService: VendorService ) {}

  ngOnInit():void  {
    this.vendorService.profile().subscribe({next:(response)=> {
      console.log(response);
      
    }, error:(err)=>{
      console.log(err);
      
    }})
  }

  sidebarToggle() {
    
  }

  getTitle() {

  }

}
