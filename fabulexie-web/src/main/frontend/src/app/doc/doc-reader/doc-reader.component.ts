import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';

import { Document, Directory } from '../../model/document';

@Component({
  selector: 'app-doc-reader',
  templateUrl: './doc-reader.component.html',
  styleUrls: ['./doc-reader.component.scss']
})
export class DocReaderComponent implements AfterViewInit, OnInit {
	
	/*reading*/
	@ViewChild('readerFrame', {static: false})
	readerFrame: ElementRef<HTMLElement>;
	
	frameSrc: SafeResourceUrl = null;
	readerExpanded: boolean;
	
	nbPages:number;
	currentPage:number=1;
	
	constructor(public authService: AuthService,
		public docService: DocService,
		private sanitizer: DomSanitizer,
		private http: HttpClient,
		private route: ActivatedRoute,
		public router: Router) { }

	ngAfterViewInit(): void {
		if (this.docService.currentDoc) {
			this.loadAdaptedReader(this.docService.currentDoc.accessToken);
		}
	}
	
	ngOnInit(): void {
		this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/img/fabulexie.png');
		if (!this.docService.currentDoc) {
			this.router.navigate(['/browse']);
		}
	}
	
	moveTo(dir:Directory): void {
		this.docService.setCurrentDirectory(dir);
		this.router.navigate(['/browse']);
	}
	  
	@HostListener('window:message', ['$event'])
	onMessage(event) {
		let message:string = event.data;
		if (message.startsWith('nbPages:')) {
			this.nbPages = Number(message.substring('nbPages:'.length));
		}
	}
  
	loadAdaptedReader(token:string): void {
		let width = this.readerFrame.nativeElement.clientWidth;
		let height = this.readerFrame.nativeElement.clientHeight;
		setTimeout(() => {
			this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.settings.backend+'/documents/'+token+'/adapt/reader/'+width+'/'+height);
		});
	}

	getAdaptedHtml(): string {
		return environment.settings.backend+'/documents/'+this.docService.currentDoc.accessToken+'/adapt/html';
	}
  
	getAdaptedDocxUrl(): string {
		return environment.settings.backend+'/documents/'+this.docService.currentDoc.accessToken+'/adapt/docx/';
	}
  
	getHtml(): string {
		return environment.settings.backend+'/documents/'+this.docService.currentDoc.accessToken+'/html';
	}
  
	getDocxUrl(): string {
	  return environment.settings.backend+'/documents/'+this.docService.currentDoc.accessToken+'/docx/';
	}

	nextPage():void {
	  if (this.currentPage<this.nbPages) {
		  this.currentPage++;
		  eval('document.getElementById("reader").contentWindow.postMessage("openPage:'+this.currentPage+'", "*")');
	  }
	}
	previousPage():void {
	  if (this.currentPage>1) {
		  this.currentPage--;
		  eval('document.getElementById("reader").contentWindow.postMessage("openPage:'+this.currentPage+'", "*")');
	  }
	}
}
