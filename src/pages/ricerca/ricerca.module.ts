import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RicercaPage } from './ricerca';

@NgModule({
  declarations: [
    RicercaPage,
  ],
  imports: [
    IonicPageModule.forChild(RicercaPage),
  ],
})
export class RicercaPageModule {}
