import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-rental-list-detail',
  templateUrl: './rental-list-detail.component.html',
  styleUrls: ['./rental-list-detail.component.scss']
})
export class RentalListDetailComponent implements OnInit {
	
  @Input() rental: any;

  constructor() { }

  ngOnInit() {
  }

}
