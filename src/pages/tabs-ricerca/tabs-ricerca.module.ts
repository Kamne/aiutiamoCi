import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsRicercaPage } from './tabs-ricerca';

@NgModule({
  declarations: [
    TabsRicercaPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsRicercaPage),
  ],
})
export class TabsRicercaPageModule {}
