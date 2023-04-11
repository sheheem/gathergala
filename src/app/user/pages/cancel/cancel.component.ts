import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent {

  constructor(private _router: Router, private _title: Title){}

  ngOnInit(): void {
    this._title.setTitle('Cancel')
    setTimeout(() => {
      this._router.navigate(['/'])
    }, 5000)
  }

}
