import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRouting } from "./app.routing";
import { DatepickerModule } from "./shared/datepicker/datepicker.module";

import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditorComponent } from "./editor/editor.component";
import { CustomDatePipe } from "./shared/custom-date.pipe";

@NgModule({
  imports: [BrowserModule, FormsModule, AppRouting, DatepickerModule],
  declarations: [
    AppComponent,
    CardComponent,
    NavbarComponent,
    DashboardComponent,
    EditorComponent,
    CustomDatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
