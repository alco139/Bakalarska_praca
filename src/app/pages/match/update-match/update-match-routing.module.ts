import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMatchPage } from './update-match.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMatchPageRoutingModule {}
