import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NoDataComponent } from './no-data/no-data.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { SharedMaterialModule } from '../shared-material.module';

@NgModule({
  declarations: [
    LoadingComponent,
    NoDataComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SharedMaterialModule
  ],
  exports: [
    LoadingComponent,
    NoDataComponent,
    PreloaderComponent,
    CommonModule
  ],
  entryComponents: [
  ]
})
export class SharedComponentsModule { }
