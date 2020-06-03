import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Constants } from './shared/constants/global-constants';
import { NavComponent } from './shared/components/nav/nav.component';
import { DashboardComponent } from './feature/dashboard/component/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: Constants.ROUTES.PRINCIPAL,
        pathMatch: 'full',
      },
      {
        path: Constants.ROUTES.PRINCIPAL,
        component: DashboardComponent,
      },
      {
        path: Constants.ROUTES.USER,
        loadChildren: () => import('./feature/user/user.module').then((m) => m.UserModule),
      },
      {
        path: Constants.ROUTES.CERTIFICATE,
        loadChildren: () => import('./feature/certificate/certificate.module').then((m) => m.CertificadoModule),
      },
      {
        path: Constants.ROUTES.DELIVERY,
        loadChildren: () => import('./feature/delivery/delivery.module').then((m) => m.DeliveryModule),
      },
      {
        path: Constants.ROUTES.SECURITY,
        loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
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
