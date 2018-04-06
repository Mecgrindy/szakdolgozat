import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-management',
  providers: [SidenavService],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements AfterViewInit {

  @ViewChild('detailnav') public mainNav;

  constructor(public sidenavService: SidenavService) {
  }

  ngAfterViewInit() {
    this.sidenavService.sidenav = this.mainNav;
  }

  closeNav() {
    this.sidenavService.sidenav.close();
    this.sidenavService.prevId = '';
  }

}
