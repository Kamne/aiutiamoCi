import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCreaPage } from './event-crea';

@NgModule({
  declarations: [
    EventCreaPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCreaPage),
  ],
})
export class EventCreaPageModule {}
