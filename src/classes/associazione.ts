import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Associazione {





  constructor(public nome:String,public username:String,public img:String,public descr:String,public nato:String,
              public partitaIVA:String,public citta:String,public provincia:String,public indirizzo:String,public email:String,
              public tel:String,public tipologia:String,public membri:Array<String>) {
    console.log('Hello User');

  }

getNome(){
  return this.nome
}



getImg(){
  return this.img
}

getUsername(){
  return this.username
}
getNato(){
  return this.nato
}

getPartivaIVA(){
  return this.partitaIVA
}
getCitta(){
  return this.citta
}
getProvincia(){
  return this.provincia
}
getIndirizzo(){
  return this.indirizzo
}
getEmail(){
  return this.email
}
getTel(){
  return this.tel
}
getTipologia(){
  return this.tipologia
}
getDescr(){
  return this.descr
}

getMembri(){
  return this.membri
}

setMembri(membri){
  return this.membri = membri
}

}
