import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVenueDialogComponent } from './edit-venue-dialog.component';

describe('EditVenueDialogComponent', () => {
  let component: EditVenueDialogComponent;
  let fixture: ComponentFixture<EditVenueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVenueDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVenueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
