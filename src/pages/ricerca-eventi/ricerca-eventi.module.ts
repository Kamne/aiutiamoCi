import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RicercaEventiPage } from './ricerca-eventi';

@NgModule({
  declarations: [
    RicercaEventiPage,
  ],
  imports: [
    IonicPageModule.forChild(RicercaEventiPage),
  ],
})
export class RicercaEventiPageModule {}
