import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Routes, RouterModule } from "@angular/router";
import { SharedComponentsModule } from "../../shared/shared-components/shared-components.module";
import { SharedMaterialModule } from "../../shared/shared-material.module";
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CabsComponent } from "./cabs.component";
import { DetailsComponent } from "./details/details.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";

const routes: Routes = [
  { path: "", component: CabsComponent, data: { title: "Cabs" } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MatPaginatorModule,
    FlexLayoutModule,
    SharedComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  declarations: [CabsComponent, DetailsComponent],
  entryComponents: [DetailsComponent],
})
export class CabsModule {}
