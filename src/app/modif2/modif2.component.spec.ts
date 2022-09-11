import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modif2Component } from './modif2.component';

describe('Modif2Component', () => {
  let component: Modif2Component;
  let fixture: ComponentFixture<Modif2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Modif2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Modif2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
