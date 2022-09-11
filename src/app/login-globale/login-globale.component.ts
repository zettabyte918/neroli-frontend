import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';

@Component({
  selector: 'app-login-globale',
  templateUrl: './login-globale.component.html',
  styleUrls: ['./login-globale.component.scss']
})
export class LoginGlobaleComponent implements OnInit {
    pas=""
    log=""
  constructor(public login:LoginSService) { }
  
  ngOnInit(): void {
  }
  lginAd(){
    this.login.loginAd(this.log,this.pas)
  }
}
