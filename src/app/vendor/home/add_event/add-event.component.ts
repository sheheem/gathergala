import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Feature, VendorService } from '../../vendor.service';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  isLoading = false;
  addEventForm: FormGroup;
  ticketForm: FormGroup;

  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  addresses: { address: string; coordinates: number[] }[] = [];
  selectedAddress = null;
  co_ordinates: number[] = [];

  searchTerm: string;
  map: mapboxgl.Map;

  url = '../../../../assets/preview_img.jpg';

  selectedFile: File | undefined;
  imageUrl: string;
  imagePreview: string = '../../../../assets/preview_img.jpg';

  organizerId: string;

  constructor(
    private _vendorService: VendorService,
    private _formBuilder: FormBuilder,
    private _title: Title,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Add Event')
    
    this.addEventForm = this._formBuilder.group({
      eventName: [null, Validators.required],
      eventType: [null, Validators.required],
      eventDescription: [null, Validators.required],
      image: [null, Validators.required],
      ticket: this._formBuilder.array([]),
      location: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
    });
    // this.ticketForm = this._formBuilder.group({
    //   ticketType: [null, Validators.required],
    //   ticketNumber: [null, Validators.required],
    //   ticketPrice: [null, Validators.required],
    //   ticketDescription: [null, Validators.required],
    // });

    

    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map-mapbox', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [75.893903, 30], // starting position
      zoom: 12, // starting zoom
    });

    this.createdMarker(75.893903, 30);
    this.vendorId();
  }

  vendorId() {
    this.isLoading = true
    this._vendorService.profile().subscribe((res) => {
      this.isLoading = false;
      this.organizerId = res.profile._id;
      console.log(this.organizerId);
    });
  }

  get_ticket(): FormArray {
    return this.addEventForm.get('ticket') as FormArray;
  }

  addTicket() {
    const ticket = this._formBuilder.group({
      ticketType: [null, Validators.required],
      ticketNumber: [null, Validators.required],
      ticketPrice: [null, Validators.required],
      ticketDescription: [null, Validators.required],
    });
    (this.addEventForm.get('ticket') as FormArray).push(ticket);
  }

  onFileSelect(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.addEventForm.get('image').updateValueAndValidity();
    console.log(this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);

    this.isLoading = true;
    this._vendorService.getImageUrl().subscribe((res) => {
      this.isLoading = false;
      this.url = res.url;
    });
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
    this.addEventForm.patchValue({ location: address });
    this.addEventForm.patchValue({ latitude: coordinates[0] });
    this.addEventForm.patchValue({ longitude: coordinates[1] });
    // this.addresses = [];
  }


  onSubmit() {
    this.isLoading = true;
    this._vendorService
      .upload_image(this.url, this.selectedFile)
      .subscribe((response) => {
        this.isLoading = false;
        this.imageUrl = this.url.split('?')[0];
        this.addEventForm.patchValue({ image: this.imageUrl });
        console.log(this.imageUrl);
        
        console.log(this.addEventForm.controls)

        if (this.addEventForm.invalid) {
          console.log(this.addEventForm);
          alert('error');
          return;
        }

        const addEvent = {
          organizerId: this.organizerId,
          eventName: this.addEventForm.controls.eventName.value,
          eventType: this.addEventForm.controls.eventType.value,
          eventDescription: this.addEventForm.controls.eventDescription.value,
          imageUrl: this.addEventForm.controls.image.value,
          tickets: this.addEventForm.controls.ticket.value,
          location: this.addEventForm.controls.location.value,
          startDate: this.addEventForm.controls.start.value,
          endDate: this.addEventForm.controls.end.value,
          longitude: this.addEventForm.controls.longitude.value,
          latitude: this.addEventForm.controls.latitude.value,
        };

        this.isLoading = true
        this._vendorService.createEvent(addEvent).subscribe((res) => {
          this.isLoading = false
          this.addEventForm.reset();
          alert('Event added');
          this._router.navigate(['/vendor/event_management'])
        });
      });
  }
}
