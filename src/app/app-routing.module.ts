import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router, Resolve } from '@angular/router';

import { LayoutClassicComponent } from './layouts/layout-classic/layout-classic.component';
import { LayoutTabbedComponent } from './layouts/layout-tabbed/layout-tabbed.component';
import { LayoutBoxedComponent } from './layouts/layout-boxed/layout-boxed.component';
import { LayoutCompactComponent } from './layouts/layout-compact/layout-compact.component';
import { LayoutToolbarComponent } from './layouts/layout-toolbar/layout-toolbar.component';
import { LayoutFunkyComponent } from './layouts/layout-funky/layout-funky.component';
import { AuthGuardService } from '../app/shared/services/auth/auth-guard.service';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: '',
      data: {
        base: true
      },
      component: LayoutClassicComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: 'users',
          loadChildren: './views/users/users.module#UsersModule'
        },   
        {
          path: 'dashboard',
          loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        }, 
        {
          path: 'cabs',
          loadChildren: './views/cabs/cabs.module#CabsModule'
        },
        {
          path: 'driver',
          loadChildren: './views/driver/driver.module#DriverModule'
        },
        {
          path: 'user',
          loadChildren: './views/user/user.module#UserModule'
        },
        {
          path: 'coupons',
          loadChildren: './views/coupons/coupons.module#CouponsModule'
        },

        // {
        //   path: 'pages',
        //   loadChildren: './pages/pages.module#PagesModule'
        // },
        // {
        //   path: 'dashboards',
        //   loadChildren: './dashboards/dashboards.module#DashboardsModule'
        // },
        // {
        //   path: 'portal-examples',
        //   loadChildren: './portal-examples/portal-examples.module#PortalExamplesModule'
        // },
        // {
        //   path: 'rxjs',
        //   loadChildren: './rxjs/rxjs.module#RxjsModule'
        // },
        // {
        //   path: 'elements',
        //   loadChildren: './elements/elements.module#ElementsModule'
        // },
        // {
        //   path: 'ui',
        //   loadChildren: './user-interface/user-interface.module#UserInterfaceModule'
        // },
      ],
    },
    {
      path: 'external',
      loadChildren: './external-pages/external-pages.module#ExternalPagesModule'
    },
    {
      path: '**',
      redirectTo: '/external/404'
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  entryComponents: [
    LayoutToolbarComponent,
    LayoutCompactComponent,
    LayoutBoxedComponent,
    LayoutFunkyComponent,
    LayoutTabbedComponent
  ]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    /**
     * This allows us to switch layouts using the layout switcher.
     */
    const baseRoute = this.router.config.find(route => route.data !== undefined && route.data.base === true);
    switch (sessionStorage.getItem('portal-layout')) {
      case 'toolbar':
        baseRoute.component = LayoutToolbarComponent;
        break;
      case 'compact':
        baseRoute.component = LayoutCompactComponent;
        break;
      case 'boxed':
        baseRoute.component = LayoutBoxedComponent;
        break;
      case 'funky':
        baseRoute.component = LayoutFunkyComponent;
        break;
      case 'tabbed':
        baseRoute.component = LayoutTabbedComponent;
        break;
      default:
        // Do nothing.
        break;
    }
  }
}
