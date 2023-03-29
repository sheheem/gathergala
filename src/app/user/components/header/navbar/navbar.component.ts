import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JwtService } from 'src/app/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  token: string = '';

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.token = this._jwtService.getUserToken();
    if (this.token) {
      this.isAuth = true;
    }
  }


  onLogOut() {
    this._jwtService.destroyUserToken();
    this._router.navigate(['/login']);
  }
}
