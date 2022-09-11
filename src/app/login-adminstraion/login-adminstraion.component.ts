import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';
@Component({
  selector: 'app-login-adminstraion',
  templateUrl: './login-adminstraion.component.html',
  styleUrls: ['./login-adminstraion.component.scss']
})
export class LoginAdminstraionComponent implements OnInit {
  pas=""
  log=""

  
constructor(public loginA:LoginSService) { }

ngOnInit(): void {
}
login(){
  console.log(5)
  this.loginA. loginAd1(this.log,this.pas)
}
}
