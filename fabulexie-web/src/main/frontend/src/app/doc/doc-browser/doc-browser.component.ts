import { Component, OnInit } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';

import { Document, Directory } from '../../model/document';

import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-doc-browser',
  templateUrl: './doc-browser.component.html',
  styleUrls: ['./doc-browser.component.scss']
})
export class DocBrowserComponent implements OnInit {
	
	newDirName: string = null;
	
	/*adding file*/
	globalError: string = '';
	globalInfo: string = '';
	uploadError: string = '';
	uploadInfo: string = '';

	newDocument: Document = new Document();
	public currentDoc: Document = null;
	public currentDir: Directory = null;
    public currentIdx: number;
	file=null;
	progress: number = 0;
	
	constructor(public authService: AuthService,
		public docService: DocService,
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
		private sanitizer: DomSanitizer) { }

	ngOnInit(): void {
	}
  
  createDir():void  {
	if (this.newDirName && this.newDirName.length>3) {
		this.docService.createDirectory(this.newDirName);
	} else {
		this.globalError = 'Directory name should at least count 3 characters';
	}		
  }
  
  getCover(doc: Document): SafeResourceUrl {
	  return this.sanitizer.bypassSecurityTrustResourceUrl(environment.settings.backend+'/documents/'+doc.accessToken+'/cover.png');
  }
  
  moveTo(dir:Directory): void {
	this.docService.setCurrentDirectory(dir);
  }
  
  openFile(doc:Document) {
	  this.docService.setCurrentDocument(doc);
	  this.router.navigate(['read']);
  }
  
  /* deletions */
  public setCurrentDoc(index:number) {
	this.currentDoc = Object.assign({}, this.docService.docs[index]);
	this.currentIdx=index;
  }

  public deleteDoc() {
	this.docService.delete(this.currentDoc).subscribe(data => {
		this.globalInfo = 'Document deleted';
		this.docService.docs.splice(this.currentIdx, 1);
	});
  }
  
  public setCurrentDir(index:number) {
	this.currentDir = Object.assign({}, this.docService.subDirs[index]);
	this.currentIdx=index;
  }

  public deleteDir() {
	this.docService.deleteDir(this.currentDir).subscribe(data => {
		this.globalInfo = 'Directory deleted';
		this.docService.subDirs.splice(this.currentIdx, 1);
	});
  }
  
  public deleteCurrentSpace() {
	this.docService.deleteCurrentSpace();
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
