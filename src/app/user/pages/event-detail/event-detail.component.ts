import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iEvent } from 'src/app/model/event.interface';
import { UserService } from '../../services/user.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit, AfterViewInit {
  eventId: string;
  map: mapboxgl.Map;

  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false


  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
    private _title: Title
  ) {}

  event: iEvent;

  ngOnInit(): void {
    this.eventId = this._route.snapshot.paramMap.get('id');
    this.isloading=true
    this._userService.findEventById(this.eventId).subscribe({
      next: (response) => {
        this.isloading=false
        this.event = response.eventDetail;        
        this._title.setTitle(this.event.eventName)
        console.log(this.event.tickets[0].ticketPrice);
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createdMarker(lat: number, lng: number) {
    const marker = new mapboxgl.Marker({
      draggable: false,
    })
      .setLngLat([lat, lng])
      .addTo(this.map);
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'vv-venue-map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.event.latitude, this.event.longitude],
      zoom: 16,
    });

    this.createdMarker(this.event.latitude, this.event.longitude);
  }

  buyTicket(eventId) {
    this._router.navigate(['/tickets', eventId])
  }
}
