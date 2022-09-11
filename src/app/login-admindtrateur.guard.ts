import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSService } from 'src/app/login-s.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAdmindtrateurGuard implements CanActivate {
  constructor(public route:Router,public log:LoginSService){}
  canActivate(): boolean{
    if(!this.log.testGuard){this.route.navigate(['/logAd']);
    return  false }
return     true;           
    
  
}
  
}
