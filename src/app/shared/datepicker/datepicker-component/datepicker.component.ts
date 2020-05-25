import { Component, OnInit } from '@angular/core';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: [ './datepicker.component.css' ]
})
export class DatepickerComponent implements OnInit  {
  constructor(private dserv: DatepickerService) { }

  public currentDate: Date = new Date();
  public dd: String = "";
  public mmm: String = "";
  public yyyy: String = "";


  ngOnInit() {
    this.dserv.updateCurrentDateCallback = this.updateCurrentDate.bind(this);
    this.changeStrs();
  }

  updateCurrentDate() {    
    let val = this.dserv.str2date(this.dserv.datepickerValue);
    this.currentDate = val === "invalidDate" ? new Date() : val;
    this.changeStrs();
  }

  hideDatepicker() {
    this.dserv.datepickerValue = this.dserv.date2str(this.currentDate);
    this.dserv.hideDatepicker();
  }

  changeStrs() {
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let dt = this.currentDate;
    this.dd = (dt.getDate() < 10 ? "0" : "") + dt.getDate().toString();
    this.mmm = months[dt.getMonth()];
    this.yyyy = dt.getFullYear().toString();
  }

  plusDay() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setDate(dt.getDate() + 1));
    this.changeStrs();
  }

  lessDay() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setDate(dt.getDate() - 1));
    this.changeStrs();
  }

  plusMonth() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setMonth(dt.getMonth() + 1));
    this.changeStrs();
  }

  lessMonth() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setMonth(dt.getMonth() - 1));
    this.changeStrs();
  }

  plusYear() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setFullYear(dt.getFullYear() + 1));
    this.changeStrs();
  }

  lessYear() {
    let dt = this.currentDate;
    this.currentDate = new Date(dt.setFullYear(dt.getFullYear() - 1));
    this.changeStrs();
  }
}