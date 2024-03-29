import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinPage } from './join.page';

const routes: Routes = [
  {
    path: '',
    component: JoinPage
  },
  {
    path: 'join-match',
    loadChildren: () => import('./join-match/join-match.module').then( m => m.JoinMatchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinPageRoutingModule {}
