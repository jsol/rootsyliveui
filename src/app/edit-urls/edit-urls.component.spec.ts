import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlsComponent } from './edit-urls.component';

describe('EditUrlsComponent', () => {
  let component: EditUrlsComponent;
  let fixture: ComponentFixture<EditUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUrlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
