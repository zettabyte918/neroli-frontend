import { HttpClient } from '@angular/common/http';
import { PrefixNot } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { LoginSService } from '../login-s.service';
import { environment } from 'src/environments/environment';
/*export interface Student {
    $key: string;
    name: string;
     prenom: string;
    email: string
    phone: Number;
 }*/
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  baseurl=environment.baseURL
  baseurl1=environment.baseURL1
  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  nombreC:any
  objData:any
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,private ht:HttpClient,public log:LoginSService) { }

  // Create Student
  AddStudent(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
    var name=student.name
    var prenom=student.prenom
    var email=student.email
    var phone=student.phone
        console.log(student)
        var p6=  new Promise(resolve => {
          this.studentsRef.push({
            name:name,
            prenom:prenom,
            phone:phone,
            email:email 
          }).then(element=>{  
            let s = this.GetStudentsList(); 
            s.snapshotChanges().subscribe(data => {
            
            
             data[data.length-1].key
             resolve(  data[data.length-1].key)
            })
          })
        })
 
    // Using snapshotChanges() method to retrieve list of data along with metadata($key)
    p6.then((value) => {
    this.ht.post(this.baseurl+'/api/v1/registerAff/',student
    ).subscribe(data => {
      console.log(data)
      this.objData=data
      if(this.objData.message == true){
        alert('votre commande en cours')
        this.ht.get(this.baseurl+'/api/v1/voirPrincipale/').subscribe(data => {
          var userPrin:any
          userPrin=data
         
          this.ht.put(this.baseurl+'/api/v1/modifDemandeG/' + this.objData.user._id +'', {userAj:  userPrin._id}).subscribe(data => {
        console.log(data,'rttytg')
        this.ht.post(this.baseurl+'/eve/creercomande/',{
         date:Date(),
         datSeconde:Date.now() + 120000,
         typeLiverison:typeLiverison,
         key:value,
         produit:panniers,
         prix:prix,
         prixTot:prixt,
         nouveaux:true,
         vaildationAdminstration:false,
         datReponse:"",
         validaTionGrade:true,
         Adresse:Adres, 
         user:this.objData.user._id,
         users:[this.objData.user._id],
        }).subscribe(data => {

           console.log(data,"commande")

         })
        })
        })
      }

  if(this.objData.message == false){
    alert('erreur email est deja enregistrer')
    
  }
    })
  })
   
  }
  //pour connue version pcedent
  AddStudentVersionPrecedent(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
    var name=student.name
    var prenom=student.prenom
    var email=student.email
    var phone=student.phone
        console.log(student)
  this.studentsRef.push({
    name:name,
    prenom:prenom,
    phone:phone,
    email:email 
  }).then(element=>{ 
    let s = this.GetStudentsList(); 
    
    s.snapshotChanges().subscribe(data => {
    // Using snapshotChanges() method to retrieve list of data along with metadata($key)

   
   var key= data[data.length-1].key
  this.ht.post(this.baseurl+'/api/v1/registerAff/',student
  ).subscribe(data => {
    console.log(data)
    this.objData=data
    if(this.objData.message == true){
      this.ht.get(this.baseurl+'/api/v1/voirPrincipale/').subscribe(data => {
        var userPrin:any
        userPrin=data
       
        this.ht.put(this.baseurl+'/api/v1/modifDemandeG/' + this.objData.user._id +'', {userAj:  userPrin._id}).subscribe(data => {
      console.log(data,'rttytg')
      this.ht.post(this.baseurl+'/eve/creercomande/',{
       date:Date(),
       datSeconde:Date.now() + 120000,
       typeLiverison:typeLiverison,
       key:key,
       produit:panniers,
       prix:prix,
       prixTot:prixt,
       nouveaux:true,
       vaildationAdminstration:false,
       datReponse:"",
       validaTionGrade:true,
       Adresse:Adres, 
       user:this.objData.user._id,
       users:[this.objData.user._id],
      }).subscribe(data => {

         console.log(data,"commande")

       })
      })
      })
    }

if(this.objData.message == false){
  alert('erreur email est deja enregistrer')
  
}
  })
})
})
 
}
  //pour les non afflier
   AddStudentNonAff(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
      var name=student.name
      var prenom=student.prenom
      var email=student.email
      var phone=student.phone
          console.log(student)
          var p6=  new Promise(resolve => {
            this.studentsRef.push({
              name:name,
              prenom:prenom,
              phone:phone,
              email:email 
            }).then(element=>{  
              let s = this.GetStudentsList(); 
              s.snapshotChanges().subscribe(data => {
              
              
               data[data.length-1].key
               resolve(  data[data.length-1].key)
              })
            })
          })
   
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      p6.then((value) => {
        this.ht.post(this.baseurl+'/api/v1/registerAff/',student
        ).subscribe(data => {
          console.log(data)
          this.objData=data
          if(this.objData.message == true){
          
            console.log(data,'rttytg')
            this.ht.post(this.baseurl+'/eve/creercomande/',{
             date:Date(),
             datSeconde:Date.now() + 120000,
             typeLiverison:typeLiverison,
             key:value,
             produit:panniers,
             prix:prix,
             prixTot:prixt, 
             nouveaux:true,
             vaildationAdminstration:false,
             datReponse:"",
             validaTionGrade:true,
             Adresse:Adres, 
             user:this.objData.user._id,
             users:[this.objData.user._id],
            }).subscribe(data => {
              
               console.log(data,"commande")
               alert('votre commande en cours')
    
             })
         
          
          }
    
      if(this.objData.message == false){
        alert('erreur email est deja enregistrer')
        
      }
        })
      });
    
      
     
   
 

   
  }
//pour les nouveaux afflier ajouter
AddStudenAj(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
  var name=student.name
  var prenom=student.prenom
  var email=student.email
  var phone=student.phone
      console.log(student)
      var p6=  new Promise(resolve => {
        this.studentsRef.push({
          name:name,
          prenom:prenom,
          phone:phone,
          email:email 
        }).then(element=>{  
          let s = this.GetStudentsList(); 
          s.snapshotChanges().subscribe(data => {
          
          
           data[data.length-1].key
           resolve(  data[data.length-1].key)
          })
        })
      })

  // Using snapshotChanges() method to retrieve list of data along with metadata($key)
  p6.then((value) => {
  // Using snapshotChanges() method to retrieve list of data along with metadata($key)

 

this.ht.post(this.baseurl+'/api/v1/registerAff/',student
).subscribe(data => {
  console.log(data)
  this.objData=data
  if(this.objData.message == true){
    alert('votre commande en cours')
     
      this.ht.put(this.baseurl+'/api/v1/modifDemandeG/' + this.objData.user._id +'', {userAj:  this.log.user._id}).subscribe(data => {
    console.log(data,'rttytg')
    this.ht.post(this.baseurl+'/eve/creercomande/',{
     date:Date(),
     datSeconde:Date.now() + 120000,
     key:value,
     produit:panniers,
     prix:prix,
     prixTot:prixt,
     typeLiverison:typeLiverison,
     nouveaux:true,
     vaildationAdminstration:false,
     datReponse:"",
     validaTionGrade:true,
     Adresse:Adres,
     user:this.objData.user._id,
     users:[this.objData.user._id],
    }).subscribe(data => {
       console.log(data,"commande")
       


     })
    })
  
  }
if(this.objData.message ==false ){

  alert("email c'est deja enregistrer")
}
})


  })
}
//pour ancien aff
AddStudenAn(student:any,panniers:any,prix,prixt,typeLiverison,Adres) {
  var name=student.name
      var prenom=student.prenom
      var email=student.email
      var phone=student.phone
          console.log(student)
          var p6=  new Promise(resolve => {
            this.studentsRef.push({
              name:name,
              prenom:prenom,
              phone:phone,
              email:email 
            }).then(element=>{  
              let s = this.GetStudentsList(); 
              s.snapshotChanges().subscribe(data => {
              
              
               data[data.length-1].key
               resolve(  data[data.length-1].key)
              })
            })
          })
   
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      p6.then((value) => {
    console.log('eeen')

   
     
     
    this.ht.post(this.baseurl+'/eve/creercomande/',{

     date:Date(),
     datSeconde:Date.now() + 120000,
      key:value,
     produit:panniers,
     typeLiverison:typeLiverison,
     prix:prix,
     prixTot:prixt,
     nouveaux:true,
     vaildationAdminstration:false,
     datReponse:"",
     validaTionGrade:true,
   
     user:this.log.user._id,
     Adresse:Adres,
     users:[this.log.user._id],
    }).subscribe(data => {
      alert('votre commande en cours')
       console.log(data,"commande")

     })

  
    

    })



}
  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }

  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('students-list');
    console.log(this.studentsRef)
    return this.studentsRef;

  }  

  // Update Student Objectxx
  UpdateStudent(student:any) {
    this.studentRef.update({
      name: student.name,
       prenom: student .prenom,
      email: student.email,
      phone: student.phone
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }
  //voire nouveaux commandes
  voireCommandeNouveaux(noveauxC:any,tab:any){
    this.ht.get(this.baseurl+'/eve/voirEve/').subscribe(data=>{
      noveauxC=data
      tab=noveauxC.eves
      console.log(tab,"tabbb")
  
    })

  }
}