import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDiagComponent } from './add-user-diag.component';

describe('AddUserDiagComponent', () => {
  let component: AddUserDiagComponent;
  let fixture: ComponentFixture<AddUserDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
