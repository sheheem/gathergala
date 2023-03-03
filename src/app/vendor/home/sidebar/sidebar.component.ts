import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private jwtService: JwtService, private router: Router) {}

  onLogOut():void {
    this.router.navigate(['/vendor/login']);
    return this.jwtService.destroyToken();
  }

}
