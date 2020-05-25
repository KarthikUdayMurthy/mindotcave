import { Component } from '@angular/core';
import { CardService } from "../shared/card.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent  {
  constructor(public cardServ: CardService) {}
}