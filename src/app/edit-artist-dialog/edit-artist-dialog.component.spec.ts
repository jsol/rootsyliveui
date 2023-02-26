import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArtistDialogComponent } from './edit-artist-dialog.component';

describe('EditArtistDialogComponent', () => {
  let component: EditArtistDialogComponent;
  let fixture: ComponentFixture<EditArtistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArtistDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArtistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
