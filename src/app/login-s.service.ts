import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSService {
  baseurl=environment.baseURL
   passAd=true
  points:any
  formAf=false
  Tot=0
  totale=0
  pans=[]
  panniers=[]
  produit:any
  ordreProd=[]
  commandes=[];
  user:any;
  tabGrade:any;
  idAd:any
  testGuard=false
  Prod(e:any){
  this.ht.get(this.baseurl+'/todo/produit/').subscribe(data => {
  
    console.log(data)

     this.produit=data
    e= this.produit
    console.log(e)

  })
}

 achatper(prix:any,prixTot:any,gradUser:any){
   var grade:any;
   var somme=0;
   var sommeMax=0
  grade=this.tabGrade.find(element => element.min < prixTot &&  element.max >= prixTot);
  console.log(prixTot,"grade service log")
  //  user.niveau=grade.grade
  //  console.log(user,"servlog")   
      
for (let i = 0; i <  grade.niv; i++) {
  somme = somme+((this.tabGrade[i].max-(this.tabGrade[i].max*this.tabGrade[i].remise/100)))

   sommeMax= sommeMax+this.tabGrade[i].max
    
}
console.log(somme,"1")
console.log(sommeMax,"2")
prix=somme +((prixTot-sommeMax)-(prixTot-sommeMax)*this.tabGrade[grade.niv].remise/100)
   console.log( prix,"prix apyé service log")

 }
 achat(prix:any,prixTot:any,prixAchat:any,prixtotAv:any,user:any){
 
   var grade:any;
  grade=this.tabGrade.find(element => element.grade == user.niveau);
  if(prixTot<=grade.max){
    prix=prixAchat-(prixTot*grade.remise/100)
  }
  else{
    var grade2:any;
    var somme=grade.max-prixtotAv-(grade.max-prixtotAv*grade.remise/100)
    var sommeMax=grade.max-prixtotAv
    grade2=this.tabGrade.find(element => element.min < prixTot &&  element.max >= prixTot);
    user.niveau=grade2.grade
      
    for (let i =grade.niv+1 ; i <  grade2.niv; i++) {

      somme = somme+((this.tabGrade[i].max-(this.tabGrade[i].max*this.tabGrade[i].remise/100)))
    
       sommeMax= sommeMax+this.tabGrade[i].max
        
    }
    prix=somme +((prixtotAv-sommeMax)-(prixtotAv-sommeMax)*this.tabGrade[grade.niv].remise/100)
  }
 }
  constructor(private ht:HttpClient, private route:Router) { }
  login(email:any,password:any){
    var dataLogin:any;
    this.ht.post(this.baseurl+'/api/v1/login/',{email:email,password: password}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
      if(dataLogin.message==true){
        alert("félicitation")
        console.log(dataLogin);
        this.user=dataLogin.user
        console.log(this.user,'user')
        this.calculGrade()
        
         this.route.navigate(['/profil'])
      }
     else{
       alert("mot de passe ou email est  incorrect")
     }
      })  
  }
  regAd(){
    var dataLogin:any;
    this.ht.post(this.baseurl+'/admin/registerAd/',{name:"ayda",prenom:"kkkil",email:"ayda@gmail.fr",password:"kkil458",carteProf:445588,login:'ayda00',loginProf:"eezrt" , passwordProf:"ertyyujoo"}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
      if(dataLogin.message==true){
        alert("c'est bon")
        
           
        
      }
     else{
       alert("mots de passe incorrect")
     }
      })  
  }
  loginAd(login:any,password:any){
    var dataLogin:any;
    this.ht.post(this.baseurl+'/admin/login/',{login:login ,password: password}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
      if(dataLogin.message==true){
       this.passAd=false
       alert("secssful")
       this.idAd=dataLogin.id

      }
     else{
       alert("mots de passe incorrect")
     }
      })  
  }
 loginAd1(login:any,password:any){
    var dataLogin:any;
    this.ht.post(this.baseurl+'/admin/loginProfesseur/',{login:login ,password: password}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
      if(dataLogin.message==true){
        this.testGuard =true
        this.route.navigate(["/Ad"])

      }
     else{
       alert("password or eamail is incorrect")
     }
      })  
  }
  modifAd1(login:any,password:any){
    var dataLogin:any;
    this.ht.put(this.baseurl+'/admin/modifDemandeAd/'+this.idAd+"/",{login:login ,password: password}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
      if(dataLogin.message==true){
     alert("secssful madifcatin")

      }
     else{
       alert("errpr")
     }
      })  
  }
  modifAd2(login:any,password:any){
    var dataLogin:any;
    this.ht.put(this.baseurl+'/admin/modifDemandePr/'+this.idAd+'/',{loginProf:login ,passwordProf: password}).subscribe(data=>{
      console.log(data)
      
    dataLogin=data.valueOf()
  
    
    if(dataLogin.message==true){
      alert("secssful madifcatin")
 
       }
      else{
        alert("error")
      } 
    
      })  
  }
  calculGrade(){
    var prixTot=0
    var grade:any
   let list: any[] = [];
    list=this.user.commandes.concat(this.user.commandesIndirect);
    list=list.filter(word => word.validaTionGrade==true);
    list.forEach(element=> {
     
        prixTot=prixTot+element.prixTot
    }); 
    this.points=prixTot
  }
  pusherCommande(user:any,commande:any){
    
    var us:any
    us=user.userAj
    while (us.cin != 3) {
      us.commandes.push(commande)
      let list: any[] = [];
      list.push(us)
      us=us.userAj
    }
  }
}
