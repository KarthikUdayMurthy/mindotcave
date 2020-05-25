import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DatepickerService {
  public isDatepicker: boolean = false;
  public datepickerValue: string = "";
  public currentDate: String|Date;
  public updateCallback: Function;
  public updateCurrentDateCallback: Function;

  hideDatepicker() {
    this.isDatepicker = false;
    this.updateCallback();
  }

  showDatepicker() {
    this.isDatepicker = true;
    this.updateCurrentDateCallback();
  }

  str2date(str = "") {
    return Date.parse(str) ? new Date(str) : "invalidDate";
  }

  date2str(dt:any = new Date()) {
    if(dt === "invalidDate") {
      return "";
    }
    let res = "";
    let dd: any = dt.getDate();
    dd = dd < 10 ? "0" + dd : dd;
    let mm: any = dt.getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    let yyyy: string = dt.getFullYear().toString();
    res = mm + "/" + dd + "/" + yyyy;
    return res;
  }
}
