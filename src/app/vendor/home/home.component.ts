import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private vendorService: VendorService, private _title: Title ) {}

  ngOnInit():void  {
    this._title.setTitle('Home')
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
