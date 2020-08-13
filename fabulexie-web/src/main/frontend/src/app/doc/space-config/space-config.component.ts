import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { DocService } from '../../service/doc.service';

@Component({
  selector: 'app-space-config',
  templateUrl: './space-config.component.html',
  styleUrls: ['./space-config.component.scss']
})
export class SpaceConfigComponent implements OnInit {

  constructor(public authService: AuthService,
		public docService: DocService) { }

  ngOnInit(): void {
  }

}
