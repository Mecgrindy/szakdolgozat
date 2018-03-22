import { Component } from '@angular/core';
import { GroupService } from './group.service';
import { Group } from './group';

@Component({
  selector: 'app-group-list',
  providers: [GroupService],
  template: `
  <mat-card class="person-card" *ngFor="let group of groups">
  <mat-card-header>
    <mat-card-title>{{group.identifier}}
    </mat-card-title>
    <mat-card-subtitle>
      <b>{{group.name}}</b> ({{group.type}})</mat-card-subtitle>
    <span class="toolbar-spacer"></span>
    <button mat-icon-button [matMenuTriggerFor]="groupMenu">
      <mat-icon>more_vert</mat-icon>
    </button>
  </mat-card-header>
  <mat-card-actions class="person-action-pad">
    <button mat-button>Characteristics</button>
    <button mat-button>Members {{group.quantity}}</button>
  </mat-card-actions>
</mat-card>
<mat-menu #groupMenu="matMenu">
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
export class GroupListComponent {
  groups: [Group];

  constructor(groupService: GroupService) {
    groupService.getGroups()
      .subscribe(resp => { this.groups = resp; });
  }
}
