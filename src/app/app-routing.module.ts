import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NavComponent } from './shared/components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        component: DashboardComponent,
      },
      {
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'certificado',
        loadChildren: () => import('./certificado/certificado.module').then((m) => m.CertificadoModule),
      },
      {
        path: 'entrega',
        loadChildren: () => import('./delivery/delivery.module').then((m) => m.DeliveryModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
