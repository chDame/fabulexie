import { Component, OnInit } from '@angular/core';


import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';

import { Document } from '../../model/document';

@Component({
  selector: 'app-doc-reader',
  templateUrl: './doc-reader.component.html',
  styleUrls: ['./doc-reader.component.scss']
})
export class DocReaderComponent implements OnInit {
	
	/*reading*/
	frameSrc: SafeResourceUrl = null;
	documents: Array<Document>;
	readerExpanded: boolean;
	
	/*adding file*/
	globalError: string = '';
	globalInfo: string = '';
	
	authHeader: Array<{
			name: string;
			value: string;}> = [];
	fileNameHeader = {
			name: 'filename',
			value: 'filename'};
	directoryHeader = {
		name: 'directoryId',
		value: '0'};	
	  
	file=null;
	progress: number = 0;
	
  constructor(public authService: AuthService,
		public documentService: DocService,
		private sanitizer: DomSanitizer,
		private http: HttpClient) { }

  ngOnInit(): void {
	this.reload();
	this.authHeader.push({name: 'Authorization' , value: this.authService.user.token});
	this.authHeader.push(this.fileNameHeader);
	this.authHeader.push(this.directoryHeader);
  }
  
  reload():void {
	this.documentService.list(1,50).subscribe(data => {
	  this.documents = data.items;
	});  
  }

  loadAdaptedHtml(token:string): void {
	  this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.settings.backend+'/documents/'+token+'/adapt/html');
  }
  
  getAdaptedDocxUrl(token:string): string {
	  return environment.settings.backend+'/documents/'+token+'/adapt/docx/';
  }
  
  loadHtml(token:string): void {
	  
	  this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.settings.backend+'/documents/'+token+'/html');
  }
  
  getDocxUrl(token:string): string {
	  return environment.settings.backend+'/documents/'+token+'/docx/';
  }
  expandReader() {
	  this.readerExpanded = true;
  }
  reduceReader() {
	  this.readerExpanded = false;
  }
  
  /*adding files*/
  selectFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
  
  uploadFile() {
	this.fileNameHeader.value = this.file.name;
    this.addFile(this.file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
		  if (this.progress<100) {
			this.globalInfo=`Uploaded! ${this.progress}%`;
		  } else {
			this.globalInfo='Uploading complete! File is being processed. You can continue working';
		  }
          break;
        case HttpEventType.Response:
          this.globalInfo='File successfully added!';
          setTimeout(() => {
            this.progress = 0;
			this.globalInfo=null;
			this.globalError=null;
			this.reload();
          }, 3000);

      }
    });
  }
  
  addFile(myDocx: File): Observable<any> {
    let postheaders = this.authService.myHttpBodyheaders.set('directoryId','0');
	postheaders = postheaders.set('filename', myDocx.name);
    return this.http.post(environment.settings.backend+'/documents/',myDocx, {
      'headers': postheaders,
	  reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.fileErrorMgmt)
    );
  }
  fileErrorMgmt(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      this.globalError = error.error.message;
    } else {
      // Get server-side error
      this.globalError = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(this.globalError);
  }
}
