import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminstraionComponent } from './login-adminstraion.component';

describe('LoginAdminstraionComponent', () => {
  let component: LoginAdminstraionComponent;
  let fixture: ComponentFixture<LoginAdminstraionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdminstraionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdminstraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
