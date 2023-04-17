import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';
import { iVendorProfile } from 'src/app/model/profile.model';
import Chart from 'chart.js/auto';
import { Title } from '@angular/platform-browser';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart: any;

  vendorDetail: iVendorProfile;
  months: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

  constructor(private _vendorService: VendorService, private _title: Title) {}

  ngOnInit(): void {
    this._title.setTitle('Dashboard');
    this.getVendorDetails()
    // this._vendorService.profile().subscribe({
    //   next: (response) => {
    //     this.vendorDetail = response.profile;
    //     console.log(this.vendorDetail._id);

    //     this._vendorService.eventsHosted(this.vendorDetail._id).subscribe({
    //       next: (response) => {
    //         console.log(response.events);
    //         this.createChart();
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    //   },
    // });
  }

  getVendorDetails():void {
    this._vendorService.profile().pipe(tap(response => {
      this.vendorDetail = response.profile
    }),
    switchMap(() => this._vendorService.dashBoard(this.vendorDetail._id)),
    catchError(error => {
      console.log(error);
      return throwError('Error Fetching Events');
    })
    ).subscribe(response => {
      console.log(response.orders);
      this.createChart()
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.months,
        datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
          // 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
