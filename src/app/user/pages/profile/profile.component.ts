import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  userName: string;
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false


  constructor(private _jwtService: JwtService, private _router: Router, private _title: Title, private _userService: UserService){}

  ngOnInit(): void {
    const title = this._title.setTitle('Profile')
    this.id()
  }

  id(){
    this.isloading = true;
    this._userService.profile().subscribe({
      next: (response) => {
        this.isloading = false
        console.log(response);
        this.userName = response.profile.name
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
