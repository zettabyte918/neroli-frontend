import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gal2Component } from './gal2.component';

describe('Gal2Component', () => {
  let component: Gal2Component;
  let fixture: ComponentFixture<Gal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gal2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
