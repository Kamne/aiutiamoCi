import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqAdminPage } from './faq-admin';

@NgModule({
  declarations: [
    FaqAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqAdminPage),
  ],
})
export class FaqAdminPageModule {}
