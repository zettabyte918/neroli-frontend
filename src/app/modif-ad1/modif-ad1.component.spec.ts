import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifAd1Component } from './modif-ad1.component';

describe('ModifAd1Component', () => {
  let component: ModifAd1Component;
  let fixture: ComponentFixture<ModifAd1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifAd1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifAd1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
