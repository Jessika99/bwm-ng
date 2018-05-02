import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.getRentals();
  }

  private getRentals() {
    const rentalObservable = this.rentalService.getRentals();
    rentalObservable.subscribe((rentals: any[]) => {
      this.rentals = rentals;
      
    },
    (error) => {
    },
    () => {
    });
  }



}
