import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcComponent } from './ac/ac.component';
import { FormComponent } from './form/form.component';
import { AddStudentComponent } from './add-student/add-student.component';
;
import { AdminComponent } from './admin/admin.component';
import { ProfilAffComponent } from './profil-aff/profil-aff.component';
import { FixeComponent } from './fixe/fixe.component';
import { LoginComponent } from './login/login.component';
import { ConceptComponent } from './concept/concept.component';
import { LoginAdminstraionComponent } from './login-adminstraion/login-adminstraion.component';
import { LoginAdmindtrateurGuard } from './login-admindtrateur.guard';


const baseLayoutRouting: Routes = [

];

const routes: Routes = [

  
  { path: "", component:  AcComponent  },
  {
    path:"form",
    component:  FormComponent 
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'aa', redirectTo: '/register-student' },
  { path: 'register-student', component: AddStudentComponent },

{ path: 'Ad', component: AdminComponent, canActivate:[LoginAdmindtrateurGuard]},
   { path: 'profil', component: FixeComponent },
   { path: 'login', component: LoginComponent },
   { path: 'form', component:  FormComponent,canActivate:[LoginAdmindtrateurGuard]  },
   { path: 'cos', component: ConceptComponent  },
   { path: 'logAd', component: LoginAdminstraionComponent  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
