import { Directive, ElementRef, HostListener, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { DatepickerService } from "./datepicker.service";

@Directive({
  selector: "[mDatepicker]"
})
export class DatepickerDirective implements AfterViewInit {
  constructor(private dserv: DatepickerService, private el: ElementRef) {}

  @Output() mDatepicker = new EventEmitter();

  @HostListener("focus") onFocus() {
    let elRef = this.el.nativeElement;
    elRef.blur();
    let inpVal = this.dserv.date2str(this.dserv.str2date(elRef.value));
    this.dserv.datepickerValue = inpVal;
    elRef.value = inpVal;
    this.dserv.showDatepicker();
    this.dserv.updateCallback = this.updateValue.bind(this);
  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute("readonly", true);
  }

  updateValue() {
    this.el.nativeElement.value = this.dserv.datepickerValue;
    this.mDatepicker.emit(this.dserv.datepickerValue);
  }
}
