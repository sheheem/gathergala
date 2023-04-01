import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Feature, VendorService } from '../../vendor.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;

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

  constructor(private _vendorService: VendorService) {}

  ngOnInit(): void {
    this.addEventForm = new FormGroup({
      eventName: new FormControl(null, Validators.required),
      eventType: new FormControl(null, Validators.required),
      eventDescription: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      ticketType: new FormControl(null, Validators.required),
      ticketNumber: new FormControl(null, Validators.required),
      ticketPrice: new FormControl(null, Validators.required),
      ticketDescription: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
    });

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
    this._vendorService.profile().subscribe((res) => {
      this.organizerId = res.profile._id;
      console.log(this.organizerId);
    });
  }

  addEvent() {}

  onFileSelect(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.addEventForm.get('image').updateValueAndValidity();
    console.log(this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);

    this._vendorService.getImageUrl().subscribe((res) => {
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
    if (this.addEventForm.invalid) {
      alert('error');
      return;
    }

    this._vendorService
      .upload_image(this.url, this.selectedFile)
      .subscribe((response) => {
        this.imageUrl = this.url.split('?')[0];
        this.addEventForm.patchValue({ image: this.imageUrl });

        const addEvent = {
          organizerId: this.organizerId,
          eventName: this.addEventForm.controls.eventName.value,
          eventType: this.addEventForm.controls.eventType.value,
          eventDescription: this.addEventForm.controls.eventDescription.value,
          imageUrl: this.addEventForm.controls.image.value,
          ticketType: this.addEventForm.controls.ticketType.value,
          ticketNumber: this.addEventForm.controls.ticketNumber.value,
          ticketPrice: this.addEventForm.controls.ticketPrice.value,
          ticketDescription: this.addEventForm.controls.ticketDescription.value,
          location: this.addEventForm.controls.location.value,
          startDate: this.addEventForm.controls.start.value,
          endDate: this.addEventForm.controls.end.value,
          longitude: this.addEventForm.controls.longitude.value,
          latitude: this.addEventForm.controls.latitude.value,
        };
        console.log(addEvent);

        this._vendorService.createEvent(addEvent).subscribe((res) => {
          console.log(res);

          this.addEventForm.reset();
          alert('Event added')
        });
      });
  }
}
