import { TestBed } from '@angular/core/testing';

import { LoginAdmindtrateurGuard } from './login-admindtrateur.guard';

describe('LoginAdmindtrateurGuard', () => {
  let guard: LoginAdmindtrateurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAdmindtrateurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
