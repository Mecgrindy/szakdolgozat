import { OrganizationService } from './organization.service';
import { Organization } from './organization';
import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-list',
  providers: [OrganizationService],
  template: `
  <mat-card class="person-card" *ngFor="let org of organizations">
  <mat-card-header>
    <mat-card-title>{{org.identifier}}
    </mat-card-title>
    <mat-card-subtitle>
      <b>{{org.name}}</b> ({{org.type}})</mat-card-subtitle>
    <span class="toolbar-spacer"></span>
    <button mat-icon-button [matMenuTriggerFor]="orgMenu">
      <mat-icon>more_vert</mat-icon>
    </button>
  </mat-card-header>
  <mat-card-actions class="person-action-pad">
    <button mat-button>Part of</button>
    <button mat-button>Endpoint</button>
  </mat-card-actions>
</mat-card>
<mat-menu #orgMenu="matMenu">
  <button mat-menu-item>
    <mat-icon>edit</mat-icon>
    <span>Edit</span>
  </button>
  <button mat-menu-item>
    <mat-icon>delete</mat-icon>
    <span>Delete</span>
  </button>
</mat-menu>
  `,
  styleUrls: ['../person/person.component.css']
})
export class OrganizationListComponent {
  organizations: [Organization];

  constructor(organizationService: OrganizationService) {
    organizationService.getOrganizations()
      .subscribe(resp => { this.organizations = resp; });
  }
}
