import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { routing } from './pages-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    routing,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class PagesModule { }
