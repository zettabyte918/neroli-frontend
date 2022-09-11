import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AcComponent } from './ac/ac.component';
import {MatButtonModule} from '@angular/material/button';
import { FormComponent } from './form/form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import {MatBadgeModule} from '@angular/material/badge';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


import { IconsModule } from 'angular-bootstrap-md'
//import { PreloadersModule } from 'angular-bootstrap-md'
// NGX Pagination

import { RouterModule, Routes } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalModule, InputsModule, TooltipModule, PopoverModule, ButtonsModule} from 'angular-bootstrap-md';

//
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {

  MatAutocompleteModule,  
 } from '@angular/material/autocomplete';
import { AddStudentComponent } from './add-student/add-student.component';


// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './admin/admin.component';
import { ProfilAffComponent } from './profil-aff/profil-aff.component';
import { FixeComponent } from './fixe/fixe.component';
import { LoginComponent } from './login/login.component';
import { FormAffComponent } from './form-aff/form-aff.component';
import { FormAjoutClentAffComponent } from './form-ajout-clent-aff/form-ajout-clent-aff.component';
import { ConceptComponent } from './concept/concept.component';
import { LoginAdminstraionComponent } from './login-adminstraion/login-adminstraion.component';
import { Header2Component } from './header2/header2.component';
import { Gal2Component } from './gal2/gal2.component';
import { LoginGlobaleComponent } from './login-globale/login-globale.component';
import { ModifAd1Component } from './modif-ad1/modif-ad1.component';
import { Modif2Component } from './modif2/modif2.component';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



@NgModule({
  declarations: [AppComponent, AcComponent,ConceptComponent, FormComponent, AddStudentComponent, AdminComponent, ProfilAffComponent, FixeComponent, LoginComponent, FormAffComponent, FormAjoutClentAffComponent, LoginAdminstraionComponent, Header2Component, Gal2Component, LoginGlobaleComponent, ModifAd1Component, Modif2Component],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
   
    CarouselModule, WavesModule ,
    MatBadgeModule,
     MatCardModule,
       MatToolbarModule,
    MatSidenavModule,
 
    MatIconModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    NgxPaginationModule,
    IconsModule,
    ToastrModule.forRoot(),
    TooltipModule, PopoverModule,
   MatAutocompleteModule,ReactiveFormsModule,MatFormFieldModule,MatChipsModule,BrowserModule,MatMenuModule,MatButtonModule, AppRoutingModule, BrowserAnimationsModule,  NgxSkeletonLoaderModule,InputsModule, ButtonsModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
