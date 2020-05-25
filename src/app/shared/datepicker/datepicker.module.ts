import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { DatepickerComponent } from "./datepicker-component/datepicker.component";
import { DatepickerDirective } from "./datepicker.directive";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    DatepickerComponent,
    DatepickerDirective
  ],
  bootstrap: [],
  exports: [DatepickerComponent, DatepickerDirective]
})
export class DatepickerModule {}