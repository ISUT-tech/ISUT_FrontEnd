import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/services/jwt.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from './shared/services/auth/auth-guard.service';


import 'hammerjs';
import { CouponsComponent } from './views/coupons/coupons.component';

export function tokenGetter() {
  return localStorage.getItem('userToken');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    ChartsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:9090'],
      }
    }),
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Register Font Awesome
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    // Register layout icon SVGs
    matIconRegistry.addSvgIcon('classic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/classic.svg')
    );
    matIconRegistry.addSvgIcon('toolbar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/toolbar.svg')
    );
    matIconRegistry.addSvgIcon('compact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/compact.svg')
    );
    matIconRegistry.addSvgIcon('boxed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/boxed.svg')
    );
    matIconRegistry.addSvgIcon('funky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/funky.svg')
    );
    matIconRegistry.addSvgIcon('tabbed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/tabbed.svg')
    );
  }
}
