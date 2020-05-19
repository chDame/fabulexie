import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../service/auth.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-doc-manager',
  templateUrl: './doc-manager.component.html',
  styleUrls: ['./doc-manager.component.scss']
})
export class DocManagerComponent implements OnInit {

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
  
  constructor(private http: HttpClient, public authService: AuthService) { 
  
	  }
	  
  


  ngOnInit(): void {
	  this.authHeader.push({name: 'Authorization' , value: this.authService.user.token});
		this.authHeader.push(this.fileNameHeader);
		this.authHeader.push(this.directoryHeader);
  }


		uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
  
  submitUser() {
		this.fileNameHeader.value = this.file.name;
    this.addUser(this.file
      //this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    });
  }
	addUser(myDocx: File): Observable<any> {
    var formData: any = new FormData();
    //formData.append("name", name);
    formData.append("avatar", myDocx);
	let postheaders = this.authService.myHttpBodyheaders.set('directoryId','0')
	postheaders = postheaders.set('filename', myDocx.name);;
    return this.http.post(environment.settings.backend+'/documents/',myDocx, {
      'headers': postheaders,
	  reportProgress: true,
      observe: 'events'
	  /*,
	  Authorization: this.authService.user.token,
	  directoryId: 0,
	  filename: myDocx.name*/
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  errorMgmt(error: HttpErrorResponse) {
	  console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
