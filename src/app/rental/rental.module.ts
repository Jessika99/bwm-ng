import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListDetailComponent } from './rental-list-detail/rental-list-detail.component';

import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

import { LowercasePipe } from '../shared/pipes/lowercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
    { path: '', component: RentalListComponent },
    { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
  ]}
]

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListDetailComponent,
    RentalDetailComponent,
    LowercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
  	CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker
  ],
  providers: [
    RentalService
  ]
})
export class RentalModule { }
