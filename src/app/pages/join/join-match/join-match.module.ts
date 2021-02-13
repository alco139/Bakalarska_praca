import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinMatchPageRoutingModule } from './join-match-routing.module';

import { JoinMatchPage } from './join-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinMatchPageRoutingModule
  ],
  declarations: [JoinMatchPage]
})
export class JoinMatchPageModule {}
