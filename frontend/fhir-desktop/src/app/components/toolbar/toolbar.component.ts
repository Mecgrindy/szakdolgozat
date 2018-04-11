import { Component } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(public sidenavService: SidenavService) { }

  toggleNav() {
    this.sidenavService.sidenav.toggle();
  }
}
