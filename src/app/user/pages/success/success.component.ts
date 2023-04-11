import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  sessionId: string;
  timeLeft: number;
  timer;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _title: Title
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Success')
    this._route.queryParams.subscribe((params) => {
      this.sessionId = params.session_id;
    });
    console.log(this.sessionId);
    this._userService.orderSuccess(this.sessionId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });

    let seconds = 5;
    
    this.timer = setInterval(() => {
      this.timeLeft = seconds--;
      if(seconds < 0) {
        clearInterval(this.timer);
        this._router.navigate(['/'])
      }
    }, 1000)
  }

  
}
