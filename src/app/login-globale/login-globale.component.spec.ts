import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGlobaleComponent } from './login-globale.component';

describe('LoginGlobaleComponent', () => {
  let component: LoginGlobaleComponent;
  let fixture: ComponentFixture<LoginGlobaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGlobaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
