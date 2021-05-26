import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./pages/join/join.module').then( m => m.JoinPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-match',
    loadChildren: () => import('./pages/create-match/create-match.module').then( m => m.CreateMatchPageModule)
  },
  {
    path: 'my-matches',
    loadChildren: () => import('./pages/my-matches/my-matches.module').then( m => m.MyMatchesPageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./pages/match/match.module').then( m => m.MatchPageModule)
  },
  {
    path: 'updateProfil',
    loadChildren: () => import('./pages/profile/update-email/update-email.module').then( m => m.UpdateEmailPageModule)
  },
  {
    path: 'updateMatch',
    loadChildren: () => import('./pages/match/update-match/update-match.module').then( m => m.UpdateMatchPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
