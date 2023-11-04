import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authentication' },
  {
    path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

