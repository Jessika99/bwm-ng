import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  rentalType(isShared) {
    return isShared ? 'shared' : 'whole';
  }

  private getRangeOfDates(startAt, endAt, format) {
    const dateArr = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while(mStartAt < mEndAt) {
     dateArr.push(format(mStartAt));
     mStartAt = mStartAt.add(1, 'day');
    }

    dateArr.push(format(moment(startAt)));
    dateArr.push(format(mEndAt));

    return dateArr;
  }

  private formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, (date) =>  this.formatBookingDate(date));
  }
}