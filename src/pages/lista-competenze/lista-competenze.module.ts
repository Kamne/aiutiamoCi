import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCompetenzePage } from './lista-competenze';

@NgModule({
  declarations: [
    ListaCompetenzePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCompetenzePage),
  ],
})
export class ListaCompetenzePageModule {}
