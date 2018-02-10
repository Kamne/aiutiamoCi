import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-lista-competenze',
  templateUrl: 'lista-competenze.html',
})
export class ListaCompetenzePage {
comp: Array<boolean> = [];
competenze: Array<string> = this.navParams.get('comp');
compselected: Array<string> = this.navParams.get('select');
  constructor(public  nativeStorage:NativeStorage,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log("compSelected",this.compselected)
    console.log("competenze",this.competenze)
    for(let data of this.competenze) {
      if(this.compselected.indexOf(data) <0)
          this.comp[data] = false;
      else
        this.comp[data] = true;
    }
    console.log("ciccio",this.comp)


console.log("",this.comp)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCompetenzePage');
  }

  closeModal() {
    this.viewCtrl.dismiss(this.compselected);
  }

  selected(name:string){
    console.log(this.comp[name] )
    this.comp[name] = !this.comp[name];
    console.log(this.comp[name] )
    if(this.comp[name]){
      this.compselected.push(name)
    }
    else{
      var idx = this.compselected.indexOf(name);
      this.compselected.splice(idx, 1);
  }
  console.log(this.compselected)
}
}
