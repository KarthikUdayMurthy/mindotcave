import { Component, OnInit } from "@angular/core";
import { CardService } from "../shared/card.service";
import { ICard } from "../shared/card";
import { Router } from "@angular/router";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(public cardServ: CardService, private router: Router) {}

  private cards: Array<ICard> = [];

  ngOnInit() {
    if (this.cardServ.cards.length === 0) {
      this.cards = this.cardServ.getCards();
    } else {
      this.cards = this.cardServ.cards;
    }
  }

  goToCard(ind) {
    this.cardServ.selectedCardIndex = ind;
    this.cardServ.cardViewStatus = {
      side: "front",
      detailType: "",
      detailOrg: ""
    };
    this.router.navigateByUrl("/card");
  }

  goToEditor(ind, ev) {
    ev.stopPropagation();
    this.cardServ.selectedCardIndex = ind;
    this.router.navigateByUrl("/editor");
  }

  addCard() {
    if (this.cardServ.cards.length >= 4) {
      return;
    }
    var cardObj: ICard = {
      fullName: "",
      title: "",
      email: "",
      phone: null,
      skills: [],
      experience: []
    };
    this.cardServ.cards.push(cardObj);
    this.cardServ.selectedCardIndex = this.cardServ.cards.length - 1;
    this.router.navigateByUrl("/editor");
  }

  deleteCard(ind, ev) {
    ev.stopPropagation();
    this.cardServ.cards.splice(ind, 1);
    if (this.cardServ.selectedCardIndex === ind) {
      this.cardServ.selectedCardIndex = null;
    }
  }
}
