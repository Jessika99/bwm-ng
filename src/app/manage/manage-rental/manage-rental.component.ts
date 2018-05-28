import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { RentalService } from '../../rental/shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'bwm-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  public rentals: Rental[];
  public errors: any;

  public rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef){

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.rentalService.getCurrentUserRentals().subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }

  deleteRental(rentalIndex, rentalId): any {

    this.rentals.splice(rentalIndex, 1);
    this.rentalDeleteIndex = undefined;

  //   this.rentalService.deleteById(rental._id).subscribe(
  //     () => {
  //       this.removeRentalFromView(rental._id);
  //     },
  //     (errorsResponse: HttpErrorResponse) => {
  //       this.toastr.error(errorsResponse.error.errors[0].detail, 'Failed!');
  //     });
  // }
}}