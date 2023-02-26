import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGigDialogComponent } from './edit-gig-dialog.component';

describe('EditGigDialogComponent', () => {
  let component: EditGigDialogComponent;
  let fixture: ComponentFixture<EditGigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
