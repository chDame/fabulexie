import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Document, Directory, Space, SpaceAccess } from '../model/document';

@Injectable({
  providedIn: 'root'
})
export class DocService {

	public currentDoc: Document;
	public currentSpace: SpaceAccess;
	public currentDir: Directory;
	public breadcrumb: Array<Directory> = [];

	public spaces: Array<SpaceAccess> = [];
	public subDirs: Array<Directory> = [];
	public docs: Array<Document> = [];
	
	constructor(private http: HttpClient, private authService: AuthService) {
	}
	
	public listSpaces(): Observable<SpaceAccess[]> {
		return this.http.get<SpaceAccess[]>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces', {headers: this.authService.myHttpheaders});
	}
	
	public loadSpaces(): void {
		this.listSpaces().subscribe(data => {
			this.spaces = data;
			this.setCurrentSpace(this.spaces[0]);
		});  
	}
	
	public setCurrentSpace(spaceAccess:SpaceAccess) {
		this.currentSpace = spaceAccess;
		this.setCurrentDirectory(null);
	}
	
	public setCurrentDirectory(dir:Directory) {
		this.currentDir = dir;
		
		this.listDirectories().subscribe(data => {
		  this.subDirs = data;
		}); 
		this.listDocuments().subscribe(data => {
		  this.docs = data;
		}); 
		this.buildBreadCrumb();
	}
	public listDirectories(): Observable<Directory[]> {
		let suffix = '';
		if (this.currentDir && this.currentDir.id) {
			suffix='/'+this.currentDir.id;
		}
		return this.http.get<Directory[]>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces/'+this.currentSpace.space.id+'/directories'+suffix, {headers: this.authService.myHttpheaders});
	}
	
	public addDocument(doc:Document): void {
		this.docs.push(doc);
	}
	
	public delete(doc:Document): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces/'+this.currentSpace.space.id+'/documents/'+doc.id, {headers: this.authService.myHttpheaders});
	}
	
	public deleteDir(dir:Directory): Observable<any> {
		return this.http.delete<any>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces/'+this.currentSpace.space.id+'/directory/'+dir.id, {headers: this.authService.myHttpheaders});
	}

	public listDocuments(): Observable<Document[]> {
		let directoryUrl = '';
		if (this.currentDir && this.currentDir.id) {
			directoryUrl = '/directories/'+this.currentDir.id;
		}
		return this.http.get<Document[]>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces/'+this.currentSpace.space.id+directoryUrl+'/documents', {headers: this.authService.myHttpheaders});
	}
	
	public getFileUploadUrl(): string {
		let directoryUrl = '';
		if (this.currentDir && this.currentDir.id) {
			directoryUrl = '/directories/'+this.currentDir.id;
		}
		return environment.settings.backend + '/users/'+this.authService.user.id +
		'/spaces/'+this.currentSpace.space.id+directoryUrl+'/documents'
	}
	
	public createDirectory(dirName:string): void {
		let suffix = '';
		if (this.currentDir && this.currentDir.id) {
			suffix='/'+this.currentDir.id;
		}
		let dir = {name: dirName, shared: true}
		this.http.post<Directory>(environment.settings.backend+'/users/'+this.authService.user.id+'/spaces/'+this.currentSpace.space.id+'/directories'+suffix, dir, {headers: this.authService.myHttpBodyheaders}).subscribe(data => {
		  this.subDirs.push(data);
		});  
	}
	
	public setCurrentDocument(doc:Document):void {
		this.currentDoc = doc;
	}
	
  
	private buildBreadCrumb(): void {
		this.breadcrumb = [];
		if (this.currentDir && this.currentDir.id) {
			let dir = this.currentDir;
			while(dir) {
				this.breadcrumb.unshift(dir);
				dir = dir.parent;
			}
		}
		let root = new Directory();
		root.name = this.currentSpace.space.name;
		this.breadcrumb.unshift(root);
	}
	
	public search(page:number, count:number): Observable<any> {
		let params = "count="+count+"&page="+page+"&orderBy=id&order=DESC";
		return this.http.get<any>(environment.settings.backend+'/documents?'+params, {headers: this.authService.myHttpheaders});
	}
	
}
