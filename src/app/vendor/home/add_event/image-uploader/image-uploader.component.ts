import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  selectedFiles?: FileList;
  progressInfos: any[] = []; //contains items for display upload progress of each image, items 2 fields percentage and fileName
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectFiles = event.target.files;

    this.previews = [];
    if(this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for( let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        }
        
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  // uploadFiles(): void {
  //   this.message = [];

  //   if(this.selectedFiles) {
  //     for(let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

  // upload(idx: number, file: File): void {
  //   this.progressInfo[idx] = { value: 0, filename: file.name };

  //   if(file) {
      
  //   }
  // }




}
