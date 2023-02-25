import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultidropComponent } from './multidrop.component';

describe('MultidropComponent', () => {
  let component: MultidropComponent;
  let fixture: ComponentFixture<MultidropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultidropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultidropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
