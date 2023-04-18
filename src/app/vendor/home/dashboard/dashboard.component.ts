import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../vendor.service';
import { iVendorProfile } from 'src/app/model/profile.model';
import Chart from 'chart.js/auto';
import { Title } from '@angular/platform-browser';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { iOrder } from 'src/app/model/order.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart: any;

  vendorDetail: iVendorProfile;
  orderData: iOrder[];
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor(private _vendorService: VendorService, private _title: Title) {}

  ngOnInit(): void {
    this._title.setTitle('Dashboard');
    this.getVendorDetails();
  }

  getVendorDetails(): void {
    this._vendorService
      .profile()
      .pipe(
        tap((response) => {
          this.vendorDetail = response.profile;
        }),
        switchMap(() => this._vendorService.dashBoard(this.vendorDetail._id)),
        catchError((error) => {
          console.log(error);
          return throwError('Error Fetching Events');
        })
      )
      .subscribe((response) => {
        const targetYear = 2023;
        const targetMonth = 3;
        console.log(response.orders);
        const filteredOrders = response.orders;
        filteredOrders
          .map((orders) => {
            return {
              date: new Date(orders.orderDate),
              price: orders.totalPrice,
            };
          })
          .filter((orders) => {
            return orders.date.getFullYear() && orders.date.getMonth();
          });
        const totalSales = filteredOrders.reduce((acc, orders) => {
          return acc + orders.totalPrice;
        }, 0);
        
          this.createChart(totalSales);
        
       
      });
  }

  createChart(sales) {
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
            label: 'Sales',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
    const salesDataset = this.chart.data.datasets.find(dataset => dataset.label === 'Sales');
  if (salesDataset) {
    const aprilIndex = this.months.indexOf('Apr');
    salesDataset.data[aprilIndex] = sales;
    this.chart.update();
  }
  }
}
