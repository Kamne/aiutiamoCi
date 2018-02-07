import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnunciPage } from './annunci';

@NgModule({
  declarations: [
    AnnunciPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnunciPage),
  ],
})
export class AnnunciPageModule {}
