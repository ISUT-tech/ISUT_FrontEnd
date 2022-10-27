import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users.component';
import { usersRoutes } from './users.routing';
import { AddUsersComponent } from './add-users/add-users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { SharedComponentsModule } from '../../shared/shared-components/shared-components.module';
import { SharedMaterialModule } from '../../shared/shared-material.module';

const routes: Routes = [
    { path: "", component: UsersComponent, data: { title: "Admin" } },
  ];
@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
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
    declarations: [UsersComponent, AddUsersComponent],
    entryComponents: [AddUsersComponent],
})
export class UsersModule
{
}
