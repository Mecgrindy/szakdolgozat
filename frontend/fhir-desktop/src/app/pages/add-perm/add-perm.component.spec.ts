import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermComponent } from './add-perm.component';

describe('AddPermComponent', () => {
  let component: AddPermComponent;
  let fixture: ComponentFixture<AddPermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
