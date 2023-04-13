import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { iUserProfle } from 'src/app/model/userProfile.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  updateProfileForm: FormGroup;

  userId: string;
  profile: iUserProfle;

  selectedFile: File | undefined;
  previewImage = '../../../../assets/user-4-100x100.jpg';
  url: string;
  imageUrl: string;

  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  isloading = false;

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _title: Title,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    const title = this._title.setTitle('Profile');
    this.id();
  }

  id() {
    this.isloading = true;
    this._userService.profile().subscribe({
      next: (response) => {
        this.isloading = false;
        this.profile = response.profile;
        this.userId = response.profile._id;
        this.updateProfileForm = new FormGroup({
          firstName: new FormControl(
            this.profile?.firstName,
            Validators.required
          ),
          lastName: new FormControl(
            this.profile?.lastName,
            Validators.required
          ),
          image: new FormControl(this.profile?.image, Validators.required),
          phone: new FormControl(this.profile?.phone, Validators.required),
          name: new FormControl(this.profile?.name, Validators.required),
        });

        this.previewImage = response.profile.image;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelect(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    console.log(this.selectedFile);

    this.updateProfileForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
    this._userService.getImageUrl().subscribe({
      next: (response) => {
        console.log(response);
        this.url = response.url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSaveChanges() {
    console.log(this.updateProfileForm);
    console.log(this.userId);
    console.log(this.profile);

    this.isloading = true;
    this._userService.upload_image(this.url, this.selectedFile).subscribe({
      next: (response) => {
        console.log(this.url);

        this.imageUrl = this.url.split('?')[0];
        this.updateProfileForm.patchValue({ image: this.imageUrl });

        const updatedForm = {
          firstName: this.updateProfileForm.controls.firstName.value,
          lastName: this.updateProfileForm.controls.lastName.value,
          phone: this.updateProfileForm.controls.phone.value,
          name: this.updateProfileForm.controls.name.value,
          image: this.updateProfileForm.controls.image.value,
        };
        console.log(updatedForm);

        this._userService.updateProfile(this.userId, updatedForm).subscribe({
          next: (response) => {
            this.isloading = false;
            console.log(response);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  onLogOut() {
    this._jwtService.destroyUserToken();
    this._router.navigate(['/login']);
  }
}
