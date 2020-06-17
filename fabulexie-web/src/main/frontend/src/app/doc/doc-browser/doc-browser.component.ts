import { Component, OnInit } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';

import { Document, Directory } from '../../model/document';

@Component({
  selector: 'app-doc-browser',
  templateUrl: './doc-browser.component.html',
  styleUrls: ['./doc-browser.component.scss']
})
export class DocBrowserComponent implements OnInit {
	
	newDirName: string = null;
	/*browsing*/
	documents: Array<Document>;
	
	/*adding file*/
	globalError: string = '';
	globalInfo: string = '';
	uploadError: string = '';
	uploadInfo: string = '';

	newDocument: Document = new Document();
	file=null;
	progress: number = 0;
	
	constructor(public authService: AuthService,
		public docService: DocService,
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit(): void {
	}
  
  createDir():void  {
	if (this.newDirName && this.newDirName.length>3) {
		this.docService.createDirectory(this.newDirName);
	} else {
		this.globalError = 'Directory name should at least count 3 characters';
	}		
  }
  
  moveTo(dir:Directory): void {
	this.docService.setCurrentDirectory(dir);
  }
  
  openFile(doc:Document) {
	  this.docService.setCurrentDocument(doc);
	  this.router.navigate(['read']);
  }
  
  /*adding files*/
  selectFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }
  
  uploadFile() {
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
			this.uploadInfo=`Uploaded! ${this.progress}%`;
		  } else {
			this.uploadInfo='Uploading complete! File is being processed. You can continue working';
		  }
          break;
        case HttpEventType.Response:
          this.uploadInfo='File successfully added!';
		  this.docService.addDocument(event.body);
		  this.newDocument = new Document();
          setTimeout(() => {
            this.progress = 0;
			this.uploadInfo=null;
			this.uploadError=null;
			eval("$('#addFileModal').modal('hide')");
          }, 3000);

      }
    });
  }
  
  addFile(myDocx: File): Observable<any> {
    let postheaders = this.authService.myHttpBodyheaders;
	postheaders = postheaders.set('name', myDocx.name);
	postheaders = postheaders.set('title', this.newDocument.title);
	postheaders = postheaders.set('description', this.newDocument.description);
	postheaders = postheaders.set('author', this.newDocument.author);
	let url = this.docService.getFileUploadUrl();
    return this.http.post(url,myDocx, {
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
      this.uploadError = error.error.message;
    } else {
      // Get server-side error
      this.uploadError = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(this.uploadError);
  }
  
 
}
