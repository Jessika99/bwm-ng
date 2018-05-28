import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageComponent } from './manage.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth/shared/auth.guard';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';
import { FormatDatePipe } from '../shared/pipes/format-date.pipe';

const routes: Routes = [
{
  path: 'manage',
  component: ManageComponent,
  children: [
    { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] },
    { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] }
  ]
}
]

@NgModule({
  declarations: [
   ManageBookingComponent,
   ManageRentalComponent,
   ManageComponent,
   ManageRentalBookingComponent,
   FormatDatePipe
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    NgPipesModule
  ],
  providers: [
  ]
})
export class ManageModule { }
