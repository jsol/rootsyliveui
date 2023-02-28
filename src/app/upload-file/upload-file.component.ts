import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from '../../environments/environment';


export interface UploadedFile{
  localName:string;
  serverName:string;
  size:number;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  @Output() uploaded = new EventEmitter<UploadedFile>();
  uploadProgress: number = 0;
  uploadSub?: Subscription | null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files;
    const file = files![0]

    if (file) {
      console.log("Uploading", file)
      //this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      const upload$ = this.http.post(environment.baseUrl + "/upload-file", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => {
            this.reset()
          })
        );

      this.uploadSub = upload$.subscribe((event: any) => {
        console.log(event)

        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else {
          if (event.body) {
            this.uploaded.emit({
              localName: event.body.data.name,
              serverName: event.body.data.newName,
              size: event.body.data.size
            })
          }
        }
      })
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = null;
  }
}