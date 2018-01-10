import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Utente {



  constructor(public nome:String,public cognome:String,public username:String,public nato:String,public competenze:Array<String>,public titolo:String,
              public CF:String,public citta:String,public provincia:String,public indirizzo:String,public email:String,
              public tel:String,public tipologia:String,) {
    console.log('Hello User');

  }
getNome(){
  return this.nome
}

getCognome(){
  return this.cognome
}
getUsername(){
  return this.username
}
getNato(){
  return this.nato
}
getCompetenze(): Array<String>{

  return this.competenze
}
getCF(){
  return this.CF
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
getToStringCompetenze(){
  return this.competenze.toString()
}

}
