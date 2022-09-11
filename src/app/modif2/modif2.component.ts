import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';

@Component({
  selector: 'app-modif2',
  templateUrl: './modif2.component.html',
  styleUrls: ['./modif2.component.scss']
})
export class Modif2Component implements OnInit {
  log=""
  pas=""
  constructor(public login:LoginSService) { }

  ngOnInit(): void {
  }
  ModifAd(){
    this.login.modifAd2(this.log,this.pas)
  } 
}
