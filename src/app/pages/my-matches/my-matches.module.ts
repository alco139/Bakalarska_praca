import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMatchesPageRoutingModule } from './my-matches-routing.module';

import { MyMatchesPage } from './my-matches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMatchesPageRoutingModule
  ],
  declarations: [MyMatchesPage]
})
export class MyMatchesPageModule {}
