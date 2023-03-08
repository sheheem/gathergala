import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { VendorService } from '../../vendor.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
  
})
export class AddEventComponent implements OnInit {

  constructor(private _mapBox: VendorService) {}

  @ViewChild(MatSort) sort!: MatSort;
  searchTerm: string;
  map: mapboxgl.Map;

  display: FormControl = new FormControl("", Validators.required);
  url = '../../../../assets/preview_img.jpg';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
    container: 'map-mapbox', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [  75.893903,11.152453], // starting position
    zoom: 12 // starting zoom
    });

    this.createdMarker(  75.893903,11.152453 )
  }

  createdMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.map);

      marker.on('drag' , () => {
        console.log( marker.getLngLat() );
        
      })
  }

  search(event) {
    this.searchTerm = event.target.value.toLowerCase();
    if (this.searchTerm && this.searchTerm.length > 0 ) {
      this._mapBox.search_word(this.searchTerm).subscribe((res) => {
        console.log(res);
        
      })
    }
  }


  
 

}
