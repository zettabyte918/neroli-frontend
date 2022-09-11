import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER, I} from '@angular/cdk/keycodes';

import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { interval, Subscription,Observable,Observer } from 'rxjs';
import { Router } from '@angular/router';

import {map, startWith} from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';
import { environment } from 'src/environments/environment';


import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips'
import { LoginSService } from '../login-s.service';
import { saveAs } from 'file-saver';

declare var $: any;
import { CrudService } from '../services/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { Console } from 'console';
import { resolve } from 'dns';


export interface Student {
    $key: string;
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: Number;
 }
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid );
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }

}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  baseURL=environment.baseURL
  baseurl1=environment.baseURL1

    navList = [{name:'home'},{name:'home'},{name:'home'},{name:'home'},{name:'home'}];
  //fir
  k:any
  p: number = 1;                      // Settup up pagination variable
  Student: Student[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;  
  //fir
    dtWh:any
  selectF:File=null
  selectF2:File=null
 
 pass=""; 
 prixTOT=0
 matcher = new MyErrorStateMatcher();
 matcherEmail=new MyErrorStateMatcher();


objData:any;  
 obj:any;
 pannier:any;
 //menue
 Ajclient=false;
 Ajcommande=false;
 ajProd=false;
 nvCom=false
 gradeAff=false
 testSal=false
 testCommandesValider=false
 testCommandesValiderNonAff=false
 testAffichProd=false
 testClientAff=false
 testClientNonAff=false
 testNvcommandesNonAff=false
 testNvcommandesAff=false
 testTableGrade=false
 passAd=this.log.passAd
charg=false
chargNoti=false
chargValid=false
 //menue parmettre avance
 testSalaire=false
 TESTmodif1=false
 TESTmodif2=false
 TESTform=false
 //
 panniers: any[] = [];
 nombre=1
 prixApyé=0
//produit
 nameProd='';
 prixProd=0;
 refProd='';
 image:any
 sex="f"
 Tprod="cosmetique"
promo=0
tabProds:any
descProd=""
prodMod:any
idProdMod:any
imgMod=""

//fin produit
//grade
grade=""
min=0
max=0
prime=0
remise=0
niveau=0
PrimePar=0
testPrime=false;
tabpri=[];
in=0
tabpirme:any
testRemp=false
testAjRemp=false
gradePrime:any
testModifGrade=false
inGradeMod=0
//fingrade
//salaire
tabSalaire:any
//
//commande
tabNovAff:any
tabNovNonAff:any
Ncommandes:any //pour nouveaux commandes
tabNC=[] //pour tableau  nouveaux commande
tabNCAff=[]
tabNCnonAff=[]

tabVC=[]
tabVCAff=[]
tabVCnonAff=[]
tab_commande_nonValid:any
tab_commandes_aff:any
Vcommandes:any
//
//client
objClient:any
tabClient:any
//
whileTeste:any
 value=""
  porduit=[]
  tabNiv=["ambasadeur","consielAide","animateurAide","animateur","superviseur"]
  prod:any
   //mat
 
   name = "Angular";

   unfilteredDataToSearch: any[] = [];
     
 
   filteredDataToSearch: any[] = [];
 
   public beComponentForm: FormGroup = new FormGroup({
     slct_cntrl: new FormControl("")
   });
  

 
   lookup(e:any) {
     this.filteredDataToSearch = this.unfilteredDataToSearch
       .filter(
         i =>
           (i.nameProd + " - "  + "(" + i.refProd + ")")
             .toString()
             .toLowerCase()
             .indexOf(e.target.value) > -1
       )
       .map(w => {
         return {
           text: w.nameProd + " - " + "(" + w.refProd + ")",
           value: w._id,
           prixProd:w.prixProd
          
         };
       });

       console.log( this.filteredDataToSearch ,"zzz")
   }
 
   clean(t:any){
     t.value = '';
     this.lookup(t.value);
   }
  com(e:any){
     this.pannier=this.filteredDataToSearch[e]
     console.log(this.pannier)
  }

   //fmat
 constructor( private route:Router,private ht:HttpClient, public log:LoginSService,    public crudApi: CrudService, // Inject student CRUD services in constructor.
  public toastr: ToastrService ) {  
}

ajtPan(){
 var pan ={
 prod:this.pannier,
 nombre:this.nombre
 }

  this.panniers.push(pan)
  this.prixTOT=this.prixTOT + (pan.prod.prixProd *Number(this.nombre) )
  console.log(Number(this.nombre))
  console.log( this.prixTOT)
  if(this.prixTOT>100){
   this.Ajclient=true

  }
 else{
   this.Ajclient=false
 }
}
 /*pusher(e:any){
  console.log(e.target.value)
  var prix=this.porduit[e.target.value].prix
  this.prixTOT=this.prixTOT+this.porduit[e.target.value].prix
  console.log(this.prixTOT)
  if(this.prixTOT>100){
    this.Ajclient=true
  }
 }*/
 /// produit 
 ajoutP(){
  this.Ajclient=false;
 this.Ajcommande=false;
 this.ajProd=true;
 this.nvCom=false
 this.gradeAff=false
 this.testSal=false
 this.testCommandesValider=false
 this.testCommandesValiderNonAff=false
 this.testAffichProd=false
 this.testClientAff=false
 this.testClientNonAff=false
this.testNvcommandesNonAff=false
 this.testNvcommandesAff=false
 this.testPrime=false
 this. testTableGrade=false
 this.nameProd=""
    this.prixProd=0
    this.refProd=""
    
   
   this.promo=0
   this.descProd=""

}



selctProd(e){
  this.Tprod=e.target.value
 }
 selectSex(e){
  this.sex=e.target.value
 }
 selectFile(e){
  console.log(e);
  this.selectF=<File>e.target.files[0]
  
}

selectFile2(e){
  console.log(e);
  this.selectF2=<File>e.target.files[0]
  
}
 enre(){
  var fd=new FormData
  console.log(this.selectF);
  
  fd.append('image',this.selectF,this.selectF.name)
  this.ht.post(this.baseurl1+'/upload/',fd).subscribe(res=>{
    this.image=res.valueOf()
    console.log(this.image)
   var nameIm=this.baseurl1+"uploads/"+this.image.name
   console.log(nameIm,"ha")
   console.log(this.image.source,"hb")
   this.ht.post(this.baseURL+'/todo/produitC/',({descProd:this.descProd,nameProd:this.nameProd,refProd:this.refProd,prixProd:this.prixProd,img:this.baseurl1+"/uploads/"+this.image.name,type:this.Tprod,sex:this.sex,promo:this.promo })).subscribe(data => {
  var mes:any
    console.log(data)  ;
    mes=data
 if(mes.Message==true){
   console.log("11")
  alert("produit ajouter")
 }
 if(mes.Message==false){
  alert("refernce produit deja exister")
 }
})
  })
 }
 getProds(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false
  this.gradeAff=false
  this.testSal=false
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=true
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  
 this. testTableGrade=false
  this.ht.get(this.baseURL+'/todo/produit/').subscribe(data=>{
   
    this.tabProds=data
    console.log(this.tabProds)
  })
 }
 modifProd(){
   console.log(this.nameProd,"ee")
   if(this.selectF2!=null){
    console.log(5)
    var fd=new FormData
    console.log(this.selectF2);
    fd.append('image',this.selectF2,this.selectF2.name)
    this.ht.post(this.baseurl1+'/upload/',fd).subscribe(res=>{
      this.image=res.valueOf()
      this.ht.put(this.baseURL+'/todo/modifDemandeP/'+ this.idProdMod+'/',({descProd:this.descProd,nameProd:this.nameProd,refProd:this.refProd,prixProd:this.prixProd,img:this.baseurl1+"/uploads/"+this.image.name,type:this.Tprod,sex:this.sex,promo:this.promo })).subscribe(data => {
        console.log(data)  ;
        alert('Successfully modification')
        
      })
  
    })
   }
 if(this.selectF2==null){
  this.ht.put(this.baseURL+'/todo/modifDemandeP/'+ this.idProdMod+'/',({descProd:this.descProd,nameProd:this.nameProd,refProd:this.refProd,prixProd:this.prixProd,type:this.Tprod,sex:this.sex,promo:this.promo })).subscribe(data => {
    console.log(data)  ;
    alert('Successfully modification')
    
  })
 }
 }
 deletProd(e){
this.ht.delete(this.baseURL+'/todo/ProdDelet/'+ this.tabProds[e]._id+'/').subscribe(data=>{
  this.tabProds=data
  alert("produit a suprimé")
})
 }
 getProdMod(e){
  this.ht.get(this.baseURL+'/todo/produit/'+ this.tabProds[e]._id+'/').subscribe(data=>{
    this.idProdMod=this.tabProds[e]._id
    this.prodMod=data
    this.imgMod=this.prodMod.img
    this.nameProd=this.prodMod.nameProd;
    this.prixProd=this.prodMod.prixProd;
    this.refProd=this.prodMod.refProd;
    
    this.sex=this.prodMod.sex
    this.Tprod=this.prodMod.type
   this.promo=this.prodMod.promo
   this.descProd=this.prodMod.descProd
  })
 }
 //
 ngOnInit(): void {
   $(document).ready(function(){
     $("#menu_icon").click(function(){
         $(".open_sidbar").toggleClass("small_sidebar");
         $('.remove_text').toggleClass('text_hide');
         $('#content_body').toggleClass('margin_left');
     });
 });
 var i=0
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetStudentsList(); 
    s.snapshotChanges().subscribe(data => {
       // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Student);
       this.k= this.Student.length
      })
    })
    
    this.ht.get(this.baseURL+'/group/VGroup/').subscribe(data => {
  
     
  
      this.log.tabGrade=data
  
   
      function compare(a, b) {
        const br1=a.max
        const br2=b.max
       if (br1 > br2) return 1;
       if (br2 > br1) return -1;
     
       return 0;
     }
     
     this.log.tabGrade =this.log.tabGrade.sort(compare);
      this.tabpirme=this.log.tabGrade
         console.log(this.log.tabGrade)

  
    })

    this.ht.get(this.baseURL+'/api/v1/voirPrincipale/').subscribe(data => {
      this.whileTeste= data
    })

 }
 dataState() {     
  this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
    
    if(data.length <= 0){
      this.hideWhenNoStudent = false;
      this.noData = true;
    } else {
      this.hideWhenNoStudent = true;
      this.noData = false;
    }
  })
}

 ajout(){
   this.Ajclient=false
   this.Ajcommande=true
   this.testPrime=false
   this.ht.get(this.baseURL+'/todo/produit/').subscribe(data => {
     console.log(data)

    this.obj=data
    this.unfilteredDataToSearch=this.obj
    this.filteredDataToSearch = this.unfilteredDataToSearch.map(w => {
     return {
       text: w.nameProd + " - " + "(" + w.refProd + ")",
       value: w._id,
       prixProd:w.prixProd
     };
   });
  })
 }
 
 //grade
 ajoutG(){
  this.Ajclient=false;
 this.Ajcommande=false;
 this.ajProd=false;
 this.nvCom=false
 this.gradeAff=true
 this.testSal=false
 this.testCommandesValider=false
 this.testCommandesValiderNonAff=false
 this.testAffichProd=false
 this.testClientAff=false
 this.testClientNonAff=false
this.testNvcommandesNonAff=false
 this.testNvcommandesAff=false
 this.testPrime=false
 
 this.testTableGrade=false
 this.ht.get(this.baseURL+'/group/VGroup/').subscribe(data => {
  
     
  
  this.log.tabGrade=data


  function compare(a, b) {
    const br1=a.max
    const br2=b.max
   if (br1 > br2) return 1;
   if (br2 > br1) return -1;
 
   return 0;
 }
 
 this.log.tabGrade =this.log.tabGrade.sort(compare);
  this.tabpirme=this.log.tabGrade
     console.log(this.log.tabGrade)


})

 
 }
 affTabGrade(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false
  this.gradeAff=false
  this.testSal=false
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  
  this.testTableGrade=true

 }
 ajoutGradePrime(){
  var i=0
  this.in=this.log.tabGrade[0].grade
  this.ht.get(this.baseURL+'/group/VGroup/').subscribe(data => {
  
     
  
    this.log.tabGrade=data

 
    function compare(a, b) {
      const br1=a.max
      const br2=b.max
     if (br1 > br2) return 1;
     if (br2 > br1) return -1;
   
     return 0;
   }
   
   this.log.tabGrade =this.log.tabGrade.sort(compare);
   
       console.log(this.log.tabGrade)


 
       this.Ajclient=false;
 this.Ajcommande=false;
 this.ajProd=false;
 this.nvCom=false
 this.gradeAff=false
 this.testSal=false
 this.testCommandesValider=false
 this.testCommandesValiderNonAff=false
 this.testAffichProd=false
 this.testClientAff=false
 this.testClientNonAff=false
this.testNvcommandesNonAff=false
 this.testNvcommandesAff=false
 this.testPrime=true   })
 }
 chGrade(e){
   console.log(5)
   console.log(e.target.value)
   console.log(this.log.tabGrade.findIndex(element => element.grade ==e.target.value) )
   this.gradePrime=this.log.tabGrade.find(element => element.grade ==e.target.value)
   console.log(this.gradePrime,"ggrade")
 this.tabpirme= this.log.tabGrade.slice(0,this.log.tabGrade.findIndex(element => element.grade ==e.target.value) );
  console.log(  this.tabpirme,'rr')
  this.testRemp=true
  this.testAjRemp=true
 }
 
 
 prio(e,i){
   var salair={
     grade:this.tabpirme[i].grade,
     salaire: e.target.value
   }
  
console.log(this.tabpri.findIndex(element => element.grade ==this.tabpirme[i].grade),"l1")
var ind=this.tabpri.findIndex(element => element.grade ==this.tabpirme[i].grade)
if(ind< 0){
  this.tabpri.push(salair) 
}
if(ind>= 0){
  this.tabpri.splice(ind, 1,salair);
}
console.log( this.tabpri,"ee")
 }
 registrePrimeAni(){
  this.ht.put(this.baseURL+'/group/modifDemandeG/' +this.gradePrime._id +'/', {    primeSalaire:this.tabpri}).subscribe(data => { console.log(data,"nnn")
alert('prime annimation ajouter')})
 }
 enreG(){
  this.ht.post(this.baseURL+'/group/registreGrade/',{grade:this.grade,min:this.min,max:this.max,remise:this.remise,primeParin:this.PrimePar}).subscribe(data => {
    console.log(data)
  alert('grade a ajouter')})
 }
 GradeMod(e){
   this.inGradeMod=e
  this.testModifGrade=true
  this.grade=this.log.tabGrade[e].grade
  this.min=this.log.tabGrade[e].min
  this.max=this.log.tabGrade[e].max
  this.remise=this.log.tabGrade[e].remise
   this.PrimePar=this.log.tabGrade[e].primeParin
 }
 modifGrade(){
  this.ht.put(this.baseURL+'/group/modifDemandeG/' +this.log.tabGrade[this.inGradeMod]._id +'/',{grade:this.grade,min:this.min,max:this.max,remise:this.remise,primeParin:this.PrimePar}).subscribe(data => {
    console.log(data)
    this.ht.get(this.baseURL+'/group/VGroup/').subscribe(data => {
  
     
  
      this.log.tabGrade=data
  
   
      function compare(a, b) {
        const br1=a.max
        const br2=b.max
       if (br1 > br2) return 1;
       if (br2 > br1) return -1;
     
       return 0;
     }
     
     this.log.tabGrade =this.log.tabGrade.sort(compare);
      this.tabpirme=this.log.tabGrade
         console.log(this.log.tabGrade)

  
    })
  alert('grade a modifier')})
 }
 ///tab commande
 VoireNotification(){
  this.ht.get(this.baseURL+'/eve/voircommandeValider/').subscribe(data=>{
    this.chargNoti=true
    if(data){
      this.chargNoti=false
    this.Ncommandes=data
  
    this.tabNovAff=this.Ncommandes.filter(ele=>ele.user.Aff==true && ele.nouveaux==true).length
    this.tabNovNonAff=this.Ncommandes.filter(ele=>ele.user.Aff==false && ele.nouveaux==true).length
  

    }
  
  })
 }
 voireCommande(){
  
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=true;
  this.gradeAff=false
  this.testSal=false
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false

 }
 voirenouveauxcommandeAff(){

    this.ht.get(this.baseURL+'/eve/voircommandeaffMiseN/').subscribe(data=>{
      this.charg=true
      if(data){
        this.charg=false
        this.Ajclient=false;
        this.Ajcommande=false;
        this.ajProd=false;
        this.nvCom=true;
        this.gradeAff=false
        this.testSal=false
        this.testCommandesValider=false
        this.testCommandesValiderNonAff=false
        this.testAffichProd=false
        this.testClientAff=false
        this.testClientNonAff=false
       this.testNvcommandesNonAff=false
        this.testNvcommandesAff=true
        this.testPrime=false
        this.testTableGrade=false
  
          var datan:any
          datan=data
        this.tabNC=[]
       
      
        this.tabNC=datan
      
        this.tabNC= this.tabNC.reverse()
        this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==true)
  
        console.log(  this.tabNC,"Aff nouveaux")
      
      }
     
    })
   

  

  
 }
 voirenouveauxcommandenonAff(){
   this.charg=true
  this.ht.get(this.baseURL+'/eve/voircommandeNouveauNonaffMise/').subscribe(data=>{
    if(data){
      this.charg=false
      this.Ajclient=false;
      this.Ajcommande=false;
      this.ajProd=false;
      this.nvCom=true;
      this.gradeAff=false
      this.testSal=false
      this.testCommandesValider=false
      this.testCommandesValiderNonAff=false
      this.testAffichProd=false
      this.testClientAff=false
      this.testClientNonAff=false
     this.testNvcommandesNonAff=true
      this.testNvcommandesAff=false
      this.testPrime=false
      this.testTableGrade=false
      var datan:any
      datan=data
      console.log(datan)
      this.tabNC=datan
    
      this.tabNC= this.tabNC.reverse()
      this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==false)

      console.log(  this.tabNC,"Aff nouveaux")
    }
   
  })
  




}
voireValidcommandenonAff(){
  this.charg=true
 
  this.ht.get(this.baseURL+'/eve/voircommandeValiderNonaffMise/').subscribe(data=>{
   
    if(data){
      this.charg=false
      this.Ajclient=false;
      this.Ajcommande=false;
      this.ajProd=false;
      this.nvCom=true;
      this.gradeAff=false
      this.testSal=false
      this.testCommandesValider=false
      this.testCommandesValiderNonAff=true
      this.testAffichProd=false
      this.testClientAff=false
      this.testClientNonAff=false
     this.testNvcommandesNonAff=false
      this.testNvcommandesAff=false
      this.testPrime=false
      this.testTableGrade=false
      this.testTableGrade=false
    
     
      var dataNon:any
      dataNon=data
      this.tabNC=dataNon  
      this.tabNC= this.tabNC.reverse()
      this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==false)

      console.log(  this.tabNC,"Aff nouveaux")
     }
  })
 

}
voireValidcommandeAff(){

  this.ht.get(this.baseURL+'/eve/voircommandeValideraffMise/').subscribe(data=>{
    this.charg=true
    if(data){
      this.charg=false     
       this.Ajclient=false;
      this.Ajcommande=false;
      this.ajProd=false;
      this.nvCom=true;
      this.gradeAff=false
      this.testSal=false
      this.testCommandesValider=true
      this.testCommandesValiderNonAff=false
      this.testAffichProd=false
      this.testClientAff=false
      this.testClientNonAff=false
     this.testNvcommandesNonAff=false
      this.testNvcommandesAff=false
      this.testPrime=false
      this.testTableGrade=false
     
      var dataNon:any
      dataNon=data
      this.tabNC=dataNon  
      this.tabNC= this.tabNC.reverse()
      this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==true)
    }
  
  
  
  })

  



}
//
//salire

//

sup(e){
  console.log(this.tabNC[e],"key")
  console.log(e,"index")
  this.crudApi.DeleteStudent(this.tabNC[e]. key)
   //this.crudApi.DeleteStudent(this.tabNC[e]. key)
 this.ht.delete(this.baseURL+'/eve/comDelet/'+this.tabNC[e]._id).subscribe(data=>{
  alert("commande a supprimé")
  this.tabNC.splice(e, 1);

 })
}
 valider(e){
  var com:any
  var comm:any
  com=this.tabNC[e]
  comm=this.tabNC[e]
 var userNou:any
  this.chargValid=true
  this.crudApi.DeleteStudent(this.tabNC[e].key)
 
    this.ht.post(this.baseURL+'/eve/pushDemandes/'+this.tabNC[e].user._id+"/"+this.tabNC[e]._id +"/",{}).subscribe(data => {
      this.chargValid=true
      userNou= data 
      if(this.tabNC[e].user.nouveaux==false && this.tabNC[e].user.Aff==true){
        let list: any[] = [];
                var prixCommandes=0
                list=userNou.commandes.filter(word => word.validaTionGrade==true);
    
                list.forEach(element=> {
                 
                  prixCommandes=prixCommandes+element.prixTot
                }); 
                 console.log(prixCommandes,'ty')
                if(prixCommandes> userNou.grade.max){
                  var grade2=this.log.tabGrade.find(element => element.min < prixCommandes &&  element.max >= prixCommandes); 
                  console.log(grade2,"pp")
                  this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + userNou._id +'/', {grade:grade2}).subscribe(data => {
                    this.ht.get(this.baseURL+'/group/VGroupe/' +  userNou.userAj.grade +'/').subscribe(data => {
         
                      var pr:any
                  
                      pr=data
                      var primeParinnage= userNou.userAj.primeParinage+pr.primeParin
                      this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + userNou.userAj._id+'/', {primeParinage:primeParinnage}).subscribe(data => {
                        console.log(data)
                        this.ht.get(this.baseURL+'/eve/voirTotFals/').subscribe(data=>{
 
                          this.dtWh=userNou.userAj
                                  
                          var unique= 10
                                var users:any
                                users= data
                                this.dtWh=users.tab.find(element => element.email==this.dtWh.email)
                                console.log( this.dtWh,"avec")
                                var tabWh=[]
                                 while (unique<20){
                                  console.log('while')
                      
                                  tabWh.push(this.dtWh)
                      
                                
                                 
                                   var or=this.dtWh.principale
                                   console.log(or)
                                   if(or==true){
                                     unique=21
                                   }
                                   if(or==false){
                                    
                                        this.dtWh=users.tab.find(element => element.email==this.dtWh.userAj.email)
                      
                                        unique=10
                                   }
                                  
                                  
                            }
                            this.ht.post(this.baseURL+'/eve/pushDemandesbou/'+ com._id +"/" ,{tab:tabWh,tabGrade:this.log.tabGrade}) .subscribe(data=>{
                                     
                             console.log(data)
                             
                             var tabsalire=tabWh.slice(0,tabWh.length)
                             tabsalire.push(com.user)
                             console.log(tabsalire,'eaeu')
                             this.ht.post(this.baseURL+'/eve/salaire/' ,{tab:tabsalire,commmande:com}) .subscribe(data=>{
                             
                                console.log(data,'voire prime')
                                this.ht.post(this.baseURL+'/eve/userAjEliminer/',{tab:tabsalire}).subscribe(data => {
                               
                                 this.ht.put(this.baseURL+'/eve/modifDemande/'+ com._id  + '/', {  vaildationAdminstration:true, nouveaux:false , datValidation:Date(),datSeconde:Date.now() + 120000}).subscribe(data => { 
                            console.log(data,'channgge')
                            this.ht.get(this.baseURL+'/eve/voircommandeaffMiseN/').subscribe(data=>{
                              if(data){
                                this.chargValid=false
                              
                                var datan:any
                                      datan=data
       
       
      
                                     this.tabNC=datan
                                 this.tabNC= this.tabNC.reverse()
                                     this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==true)
  

                              }
                          
                         
                        
                         })
                         
                           })
                               })
                      
                              }) 
                              }) 
                              })
                      })
                    })  
                  })
      
                 
                }
    
                else{
                  this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + userNou._id +'/', {grade:grade2}).subscribe(data => {
                    this.ht.get(this.baseURL+'/group/VGroupe/' +  userNou.userAj.grade +'/').subscribe(data => {
         
                      var pr:any
                  
                      pr=data
                      var primeParinnage= userNou.userAj.primeParinage+pr.primeParin
                      this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + userNou.userAj._id+'/', {primeParinage:primeParinnage}).subscribe(data => {
                        console.log(data)
                        this.ht.get(this.baseURL+'/eve/voirTotFals/').subscribe(data=>{
 
                          this.dtWh=userNou.userAj
                                  
                          var unique= 10
                                var users:any
                                users= data
                                this.dtWh=users.tab.find(element => element.email==this.dtWh.email)
                                console.log( this.dtWh,"avec")
                                var tabWh=[]
                                 while (unique<20){
                                  console.log('while')
                      
                                  tabWh.push(this.dtWh)
                      
                                
                                 
                                   var or=this.dtWh.principale
                                   console.log(or)
                                   if(or==true){
                                     unique=21
                                   }
                                   if(or==false){
                                    
                                        this.dtWh=users.tab.find(element => element.email==this.dtWh.userAj.email)
                      
                                        unique=10
                                   }
                                  
                                  
                            }
                            this.ht.post(this.baseURL+'/eve/pushDemandesbou/'+ com._id +"/" ,{tab:tabWh,tabGrade:this.log.tabGrade}) .subscribe(data=>{
                                     
                             console.log(data)
                             
                             var tabsalire=tabWh.slice(0,tabWh.length)
                             tabsalire.push(com.user)
                             console.log(tabsalire,'eaeu')
                             this.ht.post(this.baseURL+'/eve/salaire/' ,{tab:tabsalire,commmande:com}) .subscribe(data=>{
                             
                                console.log(data,'voire prime')
                                this.ht.post(this.baseURL+'/eve/userAjEliminer/',{tab:tabsalire}).subscribe(data => {
                               
                                 this.ht.put(this.baseURL+'/eve/modifDemande/'+ com._id  + '/', {  vaildationAdminstration:true, nouveaux:false , datValidation:Date(),datSeconde:Date.now() + 120000}).subscribe(data => { 
                            console.log(data,'channgge')
                            this.ht.get(this.baseURL+'/eve/voircommandeaffMiseN/').subscribe(data=>{
                              if(data){
                                this.chargValid=false
                              
                                var datan:any
                                      datan=data
       
       
      
                                     this.tabNC=datan
                                 this.tabNC= this.tabNC.reverse()
                                     this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==true)
  

                              }
                          
                         
                        
                         })
                         
                           })
                               })
                      
                              }) 
                              }) 
                              })
                      })
                    })  
                  })
                }
    
      }
      if(this.tabNC[e].user.nouveaux==true && this.tabNC[e].user.Aff==true ){
        console.log("55m")
     var grade=this.log.tabGrade.find(element => element.min < this.tabNC[e]. prixTot &&  element.max >= this.tabNC[e]. prixTot); 
     console.log(grade,"55m")
   
       this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + this.tabNC[e].user._id +'/', {nouveaux:false,grade:grade}).subscribe(data => {
        var userr:any
        userr=data
        this.ht.post(this.baseURL+'/eve/pushDemandeslisteCroissnte/'+ userr.userAj._id +"/" +userr._id + "/", {}).subscribe(data => {
          console.log(data,'eeeo')
          this.ht.get(this.baseURL+'/group/VGroupe/' +  userNou.userAj.grade +'/').subscribe(data => {
         
            var pr:any
        
            pr=data
            var primeParinnage= userNou.userAj.primeParinage+pr.primeParin
            this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + userNou.userAj._id+'/', {primeParinage:primeParinnage}).subscribe(data => {
              console.log(data)
              this.ht.get(this.baseURL+'/eve/voirTotFals/').subscribe(data=>{
 
                this.dtWh=userNou.userAj
                        
                var unique= 10
                      var users:any
                      users= data
                      this.dtWh=users.tab.find(element => element.email==this.dtWh.email)
                      console.log( this.dtWh,"avec")
                      var tabWh=[]
                       while (unique<20){
                        console.log('while')
            
                        tabWh.push(this.dtWh)
            
                      
                       
                         var or=this.dtWh.principale
                         console.log(or)
                         if(or==true){
                           unique=21
                         }
                         if(or==false){
                          
                              this.dtWh=users.tab.find(element => element.email==this.dtWh.userAj.email)
            
                              unique=10
                         }
                        
                        
                  }
                  this.ht.post(this.baseURL+'/eve/pushDemandesbou/'+ com._id +"/" ,{tab:tabWh,tabGrade:this.log.tabGrade}) .subscribe(data=>{
                           
                   console.log(data)
                   
                   var tabsalire=tabWh.slice(0,tabWh.length)
                   tabsalire.push(com.user)
                   console.log(tabsalire,'eaeu')
                   this.ht.post(this.baseURL+'/eve/salaire/' ,{tab:tabsalire,commmande:com}) .subscribe(data=>{
                   
                      console.log(data,'voire prime')
                      this.ht.post(this.baseURL+'/eve/userAjEliminer/',{tab:tabsalire}).subscribe(data => {
                     
                       this.ht.put(this.baseURL+'/eve/modifDemande/'+ com._id  + '/', {  vaildationAdminstration:true, nouveaux:false , datValidation:Date(),datSeconde:Date.now() + 120000}).subscribe(data => { 
                  console.log(data,'channgge')
                    this.ht.get(this.baseURL+'/eve/voircommandeaffMiseN/').subscribe(data=>{
                    if(data){
                      this.chargValid=false
                    
                      var datan:any
                            datan=data



                           this.tabNC=datan
                       this.tabNC= this.tabNC.reverse()
                           this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==true)


                    }
                
               
              
               })
               
               
                 })
                     })
            
                    }) 
                    }) 
                    })
            })
          })
       })
       })
   
    
  
       
          

          
    
   }

    })
  
    
  



   
  
 
// pusher commande pour user principale
 //si elle non noveaux
  
  ///si elle nouveaux pour terminer postion grade
        
         
    
      
    
                
      
      //prime de parinage
    

     
  
    
      


  

          
         
        
         
        
         
        
            
              
          
        
  
       
              
    
           
          
            
           
        
            
    
    
    
   



          
  
  


 
     
  }
  valideNonAff_commandes(e){
    var com:any
    var comm:any
    com=this.tabNC[e]
    comm=this.tabNC[e]
    this.crudApi.DeleteStudent(this.tabNC[e].key)
     this.chargValid=true
    this.ht.post(this.baseURL+'/eve/pushDemandes/'+this.tabNC[e].user._id+"/"+this.tabNC[e]._id +"/",{}).subscribe(data => {
     console.log(data,"1 pour pusher commades")
   
      console.log(this.tabNC[e].user.Aff,"nonaFF")
    
     
         this.ht.put(this.baseURL+'/api/v1/modifDemandeG/' + this.tabNC[e].user._id +'/', {nouveaux:false}).subscribe(data => {
           console.log(data,"changer a non valide")
          //
          this.ht.put(this.baseURL+'/eve/modifDemande/'+ com._id  + '/', { nouveaux:false }).subscribe(data => { 
           console.log(data,'channgge')
           this.ht.get(this.baseURL+'/eve/voircommandeValideraffMise/').subscribe(data=>{
             if(data){
               this.chargValid=false
               var datan:any
               datan=data
               this.tabNC=datan
           
               this.tabNC= this.tabNC.reverse()
               this.tabNC=this.tabNC.filter(ele=>ele.user.Aff==false)
         
               console.log(  this.tabNC,"Aff nouveaux")

             }
          
        
       
        })
        
          })
        //
         })
    
      
       
   
     alert('validation commande non Afflier terminer')
   
   
   
   
  })
  }
//fin commandes
//client
clientNonAFF(){
  this.ht.get(this.baseURL+'/eve/voirTotFalsNonAff/').subscribe(data=>{
    this.objClient=data
    console.log( this.objClient)
 
  })
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=false
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=true
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
}
clientAff(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=false
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=true
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  this.ht.get(this.baseURL+'/eve/voirTotFalsAffil/').subscribe(data=>{
    console.log(data)
    this.tabClient=data
    console.log( this.tabClient)
  
  })
}
//prmette avancee
affLog(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=true
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  console.log(this.log.passAd ,"rrr")
}
//salare
vSalaire(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=true
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  this.testSalaire=true
  this.TESTmodif1=false
  this.TESTmodif2=false
  this.log.passAd=false
  this.TESTform=false
  this.ht.get(this.baseURL+'/eve/pyesalaire/').subscribe(data => {
   console.log(data,"eerrrr")
   this.tabSalaire=data
  })
}
modifPssAd1(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=true
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  this.testSalaire=false
  this.TESTmodif1=true
  this.TESTmodif2=false 
  this.log.passAd=false
  this.TESTform=false
}
modifPssAd2(){
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=true
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  this.testSalaire=false
  this.TESTmodif1=false
  this.TESTmodif2=true
  this.log.passAd=false
  this.TESTform=false
}
affFormMan(){
  console.log("555")
  this.Ajclient=false;
  this.Ajcommande=false;
  this.ajProd=false;
  this.nvCom=false;
  this.gradeAff=false
  this.testSal=true
  this.testCommandesValider=false
  this.testCommandesValiderNonAff=false
  this.testAffichProd=false
  this.testClientAff=false
  this.testClientNonAff=false
 this.testNvcommandesNonAff=false
  this.testNvcommandesAff=false
  this.testPrime=false
  this.testTableGrade=false
  this.testSalaire=false
  this.TESTmodif1=false
  this.TESTmodif2=false
  this.log.passAd=false
  this.TESTform=true
}
}
