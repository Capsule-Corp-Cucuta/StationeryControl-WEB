import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Constants } from './shared/constants/global-constants';
import { GuardService as guard } from './shared/services/guard.service';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DashboardComponent } from './feature/dashboard/component/dashboard.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: Constants.ROUTES.PRINCIPAL,
        pathMatch: 'full',
      },
      {
        path: Constants.ROUTES.PRINCIPAL,
        component: DashboardComponent,
        canActivate: [guard],
      },
      {
        path: Constants.ROUTES.USER,
        loadChildren: () => import('./feature/user/user.module').then((m) => m.UserModule),
        canActivate: [guard],
      },
      {
        path: Constants.ROUTES.CERTIFICATE,
        loadChildren: () => import('./feature/certificate/certificate.module').then((m) => m.CertificadoModule),
        canActivate: [guard],
      },
      {
        path: Constants.ROUTES.DELIVERY,
        loadChildren: () => import('./feature/delivery/delivery.module').then((m) => m.DeliveryModule),
        canActivate: [guard],
      },
      {
        path: Constants.ROUTES.NOTFOUND,
        component: NotFoundComponent,
      },
      {
        path: Constants.ROUTES.SERVER_ERROR,
        component: ServerErrorComponent,
      },
    ],
  },
  {
    path: Constants.ROUTES.SECURITY,
    loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule),
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
