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
import { DriverComponent } from "./driver.component";
import { DetailsComponent } from "./details/details.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CabDetailsComponent } from "./cab-details/cab-details.component";
import { BookingDetailsComponent } from "./booking-details/booking-details.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { TipHistoryComponent } from "./tip-history/tip-history.component";
import { AddFeedbackComponent } from './feedback/add-feedback/add-feedback.component';

const routes: Routes = [
  { path: "", component: DriverComponent, data: { title: "Driver" } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
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
  declarations: [
    DriverComponent,
    DetailsComponent,
    CabDetailsComponent,
    BookingDetailsComponent,
    FeedbackComponent,
    TipHistoryComponent,
    AddFeedbackComponent,
  ],
  entryComponents: [
    DetailsComponent,
    CabDetailsComponent,
    BookingDetailsComponent,
    TipHistoryComponent,
    FeedbackComponent,
    AddFeedbackComponent
  ],
})
export class DriverModule {}
