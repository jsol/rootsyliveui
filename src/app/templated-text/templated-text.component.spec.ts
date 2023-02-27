import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedTextComponent } from './templated-text.component';

describe('TemplatedTextComponent', () => {
  let component: TemplatedTextComponent;
  let fixture: ComponentFixture<TemplatedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatedTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
