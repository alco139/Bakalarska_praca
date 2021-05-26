import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMatchPageRoutingModule } from './update-match-routing.module';

import { UpdateMatchPage } from './update-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMatchPageRoutingModule
  ],
  declarations: [UpdateMatchPage]
})
export class UpdateMatchPageModule {}
