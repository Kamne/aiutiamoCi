import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Dialogs } from '@ionic-native/dialogs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/**
 * Generated class for the BachecaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bacheca',
  templateUrl: 'bacheca.html',
})
export class BachecaPage {

  posts: any;

  configUrl = 'http://aiutiamoc.altervista.org/getDatiBacheca.php';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public dialogs: Dialogs,
              public dialog: MatDialog) {

    this.getConfig().map(res => res.json()).subscribe(   data => {
      console.log(data);
      if(data.success){
        console.log(data.items);
        this.posts = data.items;
      }else{
        this.dialogs.alert("Valori errati")
      }
    });
  }

  nuovo_msg(){
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BachecaPage');
  }



  getConfig() {
    return this.http.get(this.configUrl);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
