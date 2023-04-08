import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent {

  constructor(private _router: Router){}

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/'])
    }, 5000)
  }

}
