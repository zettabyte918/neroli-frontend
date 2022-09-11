import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { CommandeService } from '../commande.service';
import { LoginSService } from '../login-s.service';

import { CrudService } from '../services/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.scss']
})
export class AcComponent implements OnInit {
  //scroll
  public selected = false;

  public sections = 4;

  public scroll;
  //
  //testMobile
  open = true
  close = false
  //
  baseurl = environment.baseURL;
  baseurl1 = environment.baseURL1;
  catt = true;
  cat = true;
  li = false
  nombrePan = 0
  prixTot = 0
  prixAff = 0
  tab = false;
  affForm = false
  ProduitOrdre: any
  im = true
  typeProduit = ''
  descProd: any;
  gradeUs: any
  menuList = []
  lennPan = 0
  tabProduit = []
  car = true
  imgMod = ""
  nameProd = ''
  descProde = ""
  Navigate: any
  constructor(private route: Router, public com: CommandeService, public log: LoginSService, private ht: HttpClient, public crudApi: CrudService, private renderer: Renderer2) { }
  cato() {
    this.cat = true
  }
  Vprix() {
    this.prixTot = 0
    this.car = false
    console.log(55)
    this.menuList.forEach(ele => {
      this.prixTot = this.prixTot + ele.prixProd
    })
    this.log.totale = this.prixTot
    var grade: any;
    var somme = 0;
    var sommeMax = 0
    if (this.prixTot > 100) {

      grade = this.log.tabGrade.find(element => element.min < this.prixTot && element.max >= this.prixTot);
      console.log(grade, 'eee')
      console.log(this.prixTot, "grade service log")
      //  user.niveau=grade.grade
      //  console.log(user,"servlog")   
      var niv = this.log.tabGrade.indexOf(grade)
      console.log(niv)
      if (niv > 0) {
        for (let i = 0; i < niv; i++) {
          somme = somme + (((this.log.tabGrade[i].max - sommeMax) - ((this.log.tabGrade[i].max - sommeMax) * this.log.tabGrade[i].remise / 100)))

          sommeMax = this.log.tabGrade[i].max

        }
      }
      console.log(somme, "1")
      console.log(sommeMax, "2")
      this.prixAff = somme + ((this.prixTot - sommeMax) - (this.prixTot - sommeMax) * this.log.tabGrade[niv].remise / 100)
      console.log(this.prixAff, "prix apyé service log")
    }
    else {
      this.prixAff = 0
    }
    this.tab = true
    this.im = false
    this.affForm = false
    this.cat = true
    this.catt = false

  }

  ngOnInit(): void {
    //scroll
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scroll = (window.scrollY / this.sections);
    })

    //
    document.getElementById("myLinks").style.display = "none"

    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {



      this.ProduitOrdre = data
      console.log(this.ProduitOrdre)


    })
    this.ht.get(this.baseurl + '/group/VGroup/').subscribe(data => {



      this.log.tabGrade = data


      function compare(a, b) {
        const br1 = a.max
        const br2 = b.max
        if (br1 > br2) return 1;
        if (br2 > br1) return -1;

        return 0;
      }

      this.log.tabGrade = this.log.tabGrade.sort(compare);
      console.log(this.log.tabGrade)


    })
    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {
      this.ProduitOrdre = data
      console.log(this.ProduitOrdre)
    })

  }
  afficheFormAFF() {
    if (this.prixTot >= 100) {
      this.log.pans = this.menuList
      this.menuList.forEach(element => { this.log.panniers.push(element.nameProd) })
      this.affForm = true
      this.tab = false
      this.im = false
      this.log.Tot = this.prixAff
      this.log.formAf = true
      this.catt = false
    }
    else {
      alert(' votre commande  inférieur a 100 TND')
    }


  }
  afficheForm() {

    this.log.pans = this.menuList
    this.menuList.forEach(element => { this.log.panniers.push(element.nameProd) })
    this.affForm = true
    this.tab = false
    this.im = false
    this.log.Tot = this.prixTot
    this.log.formAf = false
    this.catt = false
  }
  ajout(e) {

    this.menuList.push(this.ProduitOrdre[e])
    this.nombrePan = this.nombrePan + 1

  }
  voiredescProd(e) {
    this.descProd = this.ProduitOrdre[e]
    this.nameProd = this.ProduitOrdre[e].nameProd
    this.descProde = this.ProduitOrdre[e].descProd
    this.imgMod = this.ProduitOrdre[e].img

  }
  ajoutdescProd() {
    this.menuList.push(this.descProd)
    this.nombrePan = this.nombrePan + 1
  }
  sup(i) {
    this.menuList.splice(i, 1)
    this.nombrePan = this.menuList.length
  }
  liste() {
    if (this.menuList.length > 0) {
      this.li = true
    }
    else {
      this.li = false
    }
  }
  registreAff() {



  }
  parf() {
    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {


      this.typeProduit = "Parfums"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "parfum")
      this.cat = false
      this.close = false
      this.open = true
      this.catt = false
      this.im = true;
      this.tab = false
      document.getElementById("myLinks").style.display = "none"
      console.log(this.ProduitOrdre, "prod")


    })
  }
  cosm() {
    console.log("ee")
    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {

      this.typeProduit = "Cosmétique naturelle"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "cosmetique")
      console.log(this.ProduitOrdre, "prod")
      document.getElementById("myLinks").style.display = "none"
      this.cat = false;
      this.im = true;
      this.tab = false
      this.catt = false

      this.close = false
      this.open = true

    })
  }

  acce() {
    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {
      this.typeProduit = "Accessoires"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "accesoires")
      console.log(this.ProduitOrdre, "prod")
      console.log(this.ProduitOrdre)
      document.getElementById("myLinks").style.display = "none"
      this.close = false
      this.open = true
      this.catt = false
      this.cat = false;
      this.im = true;
      this.tab = false
    })
  }

  bij() {

    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {
      this.typeProduit = "Bijoux"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "bijoux")
      console.log(this.ProduitOrdre, "prod")
      console.log(this.ProduitOrdre)
      document.getElementById("myLinks").style.display = "none"
      this.close = false
      this.open = true
      this.cat = false;
      this.catt = false
      this.im = true;
      this.tab = false
    })

  }
  ling() {

    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {
      this.typeProduit = "Lingerie"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "lingerie")
      console.log(this.ProduitOrdre, "prod")
      console.log(this.ProduitOrdre)
      document.getElementById("myLinks").style.display = "none"
      this.close = false
      this.open = true
      this.cat = false;
      this.im = true;
      this.tab = false
      this.catt = false
    })

  }
  maq() {

    this.ht.get(this.baseurl + '/todo/produit/').subscribe(data => {
      this.typeProduit = "Maquillage"
      this.ProduitOrdre = data
      this.ProduitOrdre = this.ProduitOrdre.filter(ele => ele.type == "maquillage")
      console.log(this.ProduitOrdre, "prod")
      console.log(this.ProduitOrdre)
      document.getElementById("myLinks").style.display = "none"
      this.close = false
      this.open = true
      this.cat = false;
      this.im = true;
      this.tab = false
      this.catt = false
    })
  }
  navMobile() {
    this.open = false;
    this.close = true;
    var x = document.getElementById("myLinks");

    x.style.display = "block";


  }
  closeMobile() {
    this.open = true;
    this.close = false;
    var x = document.getElementById("myLinks");
    x.style.display = "none";
  }
  navAd() {
    this.route.navigate(["/logAd"])
  }
}
