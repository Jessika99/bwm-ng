import { Component, ViewEncapsulation, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../../auth/shared/auth.service';

import { DaterangePickerComponent } from 'ng2-daterangepicker';

import * as moment from 'moment';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() public rental: Rental;

  newBooking: Booking;

  public errors: any[] = [];

  public daterange: any = {};

  bookedOutDates: any[] = [];
  modalRef: any;

  @ViewChild(DaterangePickerComponent)
  public picker: DaterangePickerComponent;

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(public helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private auth: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length) {
      bookings.forEach(booking => {

        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }

    return this.bookedOutDates;
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date));
  }

  private addNewBookedOutDates(bookingData) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  createBooking() {
    this.newBooking.rental = this.rental;

    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData) => {
        this.newBooking = new Booking();
        this.resetDatepicker();
        this.addNewBookedOutDates(bookingData);
        this.toastr.success('Booking succesfully created, you can check your booking details in manage section', 'Success!');
        this.modalRef.close();
      },
      (errorsResponse: any) => {
        this.errors = errorsResponse.error.errors;
      })
  }


  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -value.start.diff(value.end, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

  reservePlace(content) {
    this.modalRef = this.modalService.open(content);
  }
}