import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMatchesPage } from './my-matches.page';

const routes: Routes = [
  {
    path: '',
    component: MyMatchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMatchesPageRoutingModule {}
