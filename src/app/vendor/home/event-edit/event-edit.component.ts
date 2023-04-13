import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature, VendorService } from '../../vendor.service';
import { iEvent } from 'src/app/model/event.interface';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit {
  editEventForm: FormGroup;
  eventId: string;
  event: iEvent;
  vendorId: string;

  imageUrl: string;
  imagePreview: string;
  map: mapboxgl.Map;
  selectedFile: File | undefined;
  url: string;

  addresses: { address: string; coordinates: number[] }[] = [];
  selectedAddress = null;
  co_ordinates: number[] = [];

  searchTerm: string;

  constructor(
    private _route: ActivatedRoute,
    private _vendorService: VendorService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this._route.snapshot.paramMap.get('id');
    this._vendorService.profile().subscribe({
      next: (response) => {
        this.vendorId = response.profile._id
        console.log(this.vendorId);
        
      },
      error: (err) => {
        console.log(err); 
      }
    })

    
    this._vendorService.eventDetail(this.eventId).subscribe({
      next: (response) => {
        this.event = response.eventDetail;
        console.log(this.event);

        this.list();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  list() {
    console.log(this.event.eventName);
    
    this.editEventForm = this._formBuilder.group({
      eventType: [this.event.eventType, Validators.required],
      eventName: [this.event.eventName, Validators.required],
      eventDescription: [this.event.eventDescription, Validators.required],
      image: [this.event.imageUrl, Validators.required],
      ticket: this._formBuilder.array([]),
      location: [this.event.location, Validators.required],
      start: [this.event.startDate, Validators.required],
      end: [this.event.endDate, Validators.required],
      longitude: [this.event.longitude, Validators.required],
      latitude: [this.event.latitude, Validators.required],
    });
    this.imagePreview = this.event.imageUrl;

    this.event.tickets.forEach((ticket) => {
      const tickets = this._formBuilder.group({
        ticketType: [ticket.ticketType, Validators.required],
        ticketNumber: [ticket.ticketNumber, Validators.required],
        ticketPrice: [ticket.ticketPrice, Validators.required],
        ticketDescription: [ticket.ticketDescription, Validators.required],
      });
      (this.editEventForm.get('ticket') as FormArray).push(tickets);
    });

    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [this.event.latitude, this.event.longitude], // starting position
      zoom: 12, // starting zoom
    });
    this.createdMarker(this.event.latitude, this.event.longitude);
  }

  createdMarker(lat: number, lng: number) {
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lat, lng])
      .addTo(this.map);

    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
  }

  get_ticket(): FormArray {
    return this.editEventForm.get('ticket') as FormArray;
  }

  addTicket() {
    const ticket = this._formBuilder.group({
      ticketType: [null, Validators.required],
      ticketNumber: [null, Validators.required],
      ticketPrice: [null, Validators.required],
      ticketDescription: [null, Validators.required],
    });
    (this.editEventForm.get('ticket') as FormArray).push(ticket);
  }

  onFileSelect(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.editEventForm.get('image').updateValueAndValidity();
    console.log(this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
    this._vendorService.getImageUrl().subscribe({
      next: (response) => {
        this.url = response.url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  search(event) {
    this.searchTerm = event.target.value.toLowerCase();
    if (this.searchTerm && this.searchTerm.length > 0) {
      this._vendorService
        .search_word(this.searchTerm)
        .subscribe((features: Feature[]) => {
          console.log(features);
          this.addresses = features.map((feat) => {
            //feat.place_name
            return {
              address: feat.place_name,
              coordinates: feat.geometry.coordinates,
            };
          });
          this.co_ordinates = features[0].geometry.coordinates;
          // this.co_ordinates = features.map(feat => feat.geometry)
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string, coordinates: number[]) {
    console.log(address);
    console.log(coordinates);
    this.selectedAddress = address;
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [coordinates[0], coordinates[1]], // starting position
      zoom: 16, // starting zoom
    });
    this.createdMarker(coordinates[0], coordinates[1]);
    this.editEventForm.patchValue({ location: address });
    this.editEventForm.patchValue({ latitude: coordinates[0] });
    this.editEventForm.patchValue({ longitude: coordinates[1] });
    // this.addresses = [];
  }

  onSubmit() {
    console.log(this.editEventForm);
    
    this._vendorService.upload_image(this.url, this.selectedFile).subscribe({
      next: (response) => {
        this.imageUrl = this.url.split('?')[0];
        this.editEventForm.patchValue({ image: this.imageUrl });

        const editForm = {
          organizerId: this.vendorId,
          eventName: this.editEventForm.controls.eventName.value,
          eventType: this.editEventForm.controls.eventType.value,
          eventDescription: this.editEventForm.controls.eventDescription.value,
          imageUrl: this.editEventForm.controls.image.value,
          tickets: this.editEventForm.controls.ticket.value,
          location: this.editEventForm.controls.location.value,
          startDate: this.editEventForm.controls.start.value,
          endDate: this.editEventForm.controls.end.value,
          longitude: this.editEventForm.controls.longitude.value,
          latitude: this.editEventForm.controls.latitude.value,
        };
        console.log(editForm);
      this._vendorService.updateEvent(this.eventId, editForm).subscribe({
        next: (response) => {
          console.log(response);
          this._router.navigate(['/vendor/event_management'])
        },
        error: (err) => {
          console.log(err);
        }
      })
      },
      error: (err) => {
        console.log(err);
      },
    });

    
      
    

  }
}
