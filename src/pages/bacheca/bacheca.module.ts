import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BachecaPage } from './bacheca';

@NgModule({
  declarations: [
    BachecaPage,
  ],
  imports: [
    IonicPageModule.forChild(BachecaPage),
  ],
})
export class BachecaPageModule {}
