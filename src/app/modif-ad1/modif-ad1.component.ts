import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { LoginSService } from 'src/app/login-s.service';

@Component({
  selector: 'app-modif-ad1',
  templateUrl: './modif-ad1.component.html',
  styleUrls: ['./modif-ad1.component.scss']
})
export class ModifAd1Component implements OnInit {

  pass:any
  log:any
constructor(public login:LoginSService) { }

ngOnInit(): void {
}
ModifAd(){
  this.login.modifAd1(this.log,this.pass)
}


}
