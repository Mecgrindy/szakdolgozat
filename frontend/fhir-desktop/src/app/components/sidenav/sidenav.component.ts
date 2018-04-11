import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('sidenav') public mainNav;

  constructor(public sidenavService: SidenavService) { }

  ngAfterViewInit() {
    this.sidenavService.sidenav = this.mainNav;
  }

}
