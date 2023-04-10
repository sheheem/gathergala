import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { UserService } from '../../services/user.service';
import { iOrder } from 'src/app/model/order.interface';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser'
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterContentInit {

  userId: string;
  userName: string;
  orders: iOrder[] = [];
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false

  constructor(private _jwtService: JwtService, private _router: Router, private _userService: UserService, private _title: Title){}

  ngOnInit(): void {
    this._title.setTitle('Orders')
    this.isloading = true
      this._userService.profile().subscribe({
        next: (response) => {
        this.isloading=false
          this.userId = response.profile._id   
          this.userName = response.profile.name
          this.id(this.userId)
        },
        error: (err) => {
          console.log(err);
        }
      })
      
  }

  ngAfterContentInit(): void {
      console.log(this.userId);
      
  }

  id(userId) {
    this.isloading=true
    this._userService.findOrder(userId).subscribe({
      next: (response) => {
        this.isloading=false
        this.orders = response.orders
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onLogOut() {
    this._jwtService.destroyUserToken();
    this._router.navigate(['/login']);
  }

}
