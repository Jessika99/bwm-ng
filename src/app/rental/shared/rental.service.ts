import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {

  private rentals: Rental[] = [{
    "id": "1",
    "title": "Center Apartment-1",
    "city": "San Francisco",
    "street": "Some fake street",
    "category": "apartment",
    "image": "http://via.placeholder.com/350x250",
    "bedrooms": 1,
    "description": "Very nice apartment in center of the city.",
    "dailyRate": 143,
    "shared": false,
    "createdAt": "24/12/2018"
    },
    {
    "id": "2",
    "title": "Center Apartment-2",
    "city": "New York",
    "street": "Some fake street 2",
    "category": "house",
    "image": "http://via.placeholder.com/350x250",
    "bedrooms": 2,
    "description": "Very nice apartment in center of the city.",
    "dailyRate": 443,
    "shared": true,
    "createdAt": "24/12/2018"
    },
    {
    "id": "3",
    "title": "Center Apartment-3",
    "city": "Bratislava",
    "street": "Some fake street 3",
    "category": "condo",
    "image": "http://via.placeholder.com/350x250",
    "bedrooms": 3,
    "description": "Very nice apartment in center of the city.",
    "dailyRate": 23,
    "shared": false,
    "createdAt": "24/12/2018"
  },
  {
    "id": "4",
    "title": "Center Apartment-4",
    "city": "Berlin",
    "street": "Some fake street 4",
    "category": "apartment",
    "image": "http://via.placeholder.com/350x250",
    "bedrooms": 4,
    "description": "Very nice apartment in center of the city.",
    "dailyRate": 13,
    "shared": false,
    "createdAt": "24/12/2018"
   }]

  public getRentalById(rentalId: string): Observable<Rental> {
      return new Observable<Rental>((observer) => {
          const foundRental = this.rentals.find(rental => rental.id == rentalId);
          observer.next(foundRental);
      });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000)
    });
  }
}