import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';
import { iVendorProfile } from 'src/app/model/profile.model';
import Chart from 'chart.js/auto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart:any;

  vendorDetail: iVendorProfile;

  constructor(private _vendorService: VendorService, private _title: Title){}

  ngOnInit(): void {
    this._title.setTitle('Dashboard')
      this._vendorService.profile().subscribe({
        next: (response) => {
          this.vendorDetail = response.profile;
        }
      })
      this.createChart()
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
