import { Component, OnInit } from '@angular/core';
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
	frameSrc: SafeResourceUrl = null;
	documents: Array<Document>;
  constructor(public authService: AuthService,
		public documentService: DocService,
		private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
}
