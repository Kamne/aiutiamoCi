import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpzioniAmministratorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opzioni-amministratore',
  templateUrl: 'opzioni-amministratore.html',
})
export class OpzioniAmministratorePage {

  posts: any;
  configUrl = 'http://aiutiamoc.altervista.org/getUtenti.php';
  utenti:boolean=false;
  annunci:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpzioniAmministratorePage');
  }
  getUtenti(){
    this.utenti = true;
    this.annunci = false;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
    this.getConfig().map(res => res.json()).subscribe(    data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }
    });
  }
  getConfig() {
    return this.http.get(this.configUrl);
  }
}
