import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // date = new Date().toISOString();
  date = new Date().toISOString();
  dateNow = new Date().toISOString();
  isOpen = false;
  maxDate: string;

  constructor() {}

  ngOnInit() {
    this.setMaxDate();
  }

  setDate(val) {
    this.date = val.detail.value;
  }

  setMaxDate() {
    // add one and half year to avoid max date to be the last day of current year
    const year = 31536000000;
    const sixMonths = 15768000000;

    this.maxDate = new Date(Date.now() + (year + sixMonths)).toISOString();
  }

  dateModal() {
    this.isOpen = !this.isOpen;
  }
}
