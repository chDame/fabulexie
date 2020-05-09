import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { WebproxyService } from '../service/webproxy.service';

@Component({
  selector: 'app-web-proxy',
  templateUrl: './web-proxy.component.html',
  styleUrls: ['./web-proxy.component.scss']
})
export class WebProxyComponent implements OnInit {

	public url:string;
	private safeUrl: SafeResourceUrl;
	@ViewChild("frameBrowser") frameBrowser: ElementRef;
	
	constructor(public webproxyService: WebproxyService) { }

	ngOnInit() {
	}

	onUrlChange() {
		//this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url); 
		this.webproxyService.translate(this.url).subscribe(data=> {
			this.frameBrowser.nativeElement.contentWindow.document.write(data.result);
		});
	}

}
