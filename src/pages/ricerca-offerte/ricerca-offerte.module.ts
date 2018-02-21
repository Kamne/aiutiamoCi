import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RicercaOffertePage } from './ricerca-offerte';

@NgModule({
  declarations: [
    RicercaOffertePage,
  ],
  imports: [
    IonicPageModule.forChild(RicercaOffertePage),
  ],
})
export class RicercaOffertePageModule {}
