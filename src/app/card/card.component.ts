import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { ICard } from "../shared/card";
import { CardService } from "../shared/card.service";
import html2canvas from "html2canvas";

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit, AfterViewInit {
  constructor(public cardServ: CardService) {}

  showBack: boolean = false;
  cardbackHdr: string = "";
  cardDetailShow: string = "";
  expDetail: Array<any> = [];

  cardData: ICard;

  @ViewChild("cardFront", { static: false }) cardFront: ElementRef;
  @ViewChild("downloadLink", { static: false }) downloadLink: ElementRef;

  ngOnInit() {
    this.cardData = this.cardServ.cards[this.cardServ.selectedCardIndex];
    this.cardServ.sortExp(this.cardData.experience);
    this.cardServ.onEditGoToSlide = 0;
    this.cardServ.onEditGoToOrg = -1;
    if (this.cardServ.cardViewStatus.side === "front") {
      this.showFront();
    } else if (this.cardServ.cardViewStatus.side === "back") {
      this.showBack = false;
      setTimeout(() => {
        this.showDetail(
          this.cardServ.cardViewStatus.detailType,
          this.cardServ.cardViewStatus.detailOrg
        );
      }, 300);
    }
  }

  ngAfterViewInit() {}

  getOrgs(): Array<any> {
    var expArray = this.cardData.experience;
    var orgs = [];
    expArray.forEach(exp => {
      if (orgs.indexOf(exp.orgName) < 0) {
        orgs.push(exp.orgName);
      }
    });
    return orgs;
  }

  getYearsAndMonths(startDate, endDate): any {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return { y: 0, m: 0 };
    }
    var diff = Math.floor(endDate.getTime() - startDate.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(((days / 365) * 12) % 12);
    var years = Math.floor(days / 365);

    return { y: years, m: months };
  }

  getExp(type): any {
    var expArray = this.cardData.experience;
    var result = expArray.reduce(
      (res, exp) => {
        if (exp.isRelevant || type === "total") {
          var startDate = new Date(exp.fromDate);
          var endDate = exp.toDate === "NA" ? new Date() : new Date(exp.toDate);
          var ym = this.getYearsAndMonths(startDate, endDate);
          res.y += ym.y;
          res.m += ym.m;
          if (res.m > 11) {
            res.y += 1;
            res.m = res.m - 12;
          }
        }
        return res;
      },
      { y: 0, m: 0 }
    );
    return result;
  }

  showDetail(typ = "", org = ""): void {
    let type = typ.toLowerCase();
    this.cardbackHdr = "";
    this.cardDetailShow = "";
    this.expDetail = [];
    if (["name", "title", "email", "phone"].indexOf(type) >= 0) {
      this.cardbackHdr = "Primary Details";
      this.cardDetailShow = "primaryDetails";
      this.cardServ.onEditGoToSlide = 0;
    } else if (["skills"].indexOf(type) >= 0) {
      this.cardbackHdr = "Key Skills";
      this.cardDetailShow = "keySkills";
      this.cardServ.onEditGoToSlide = 1;
    } else if (["exp1"].indexOf(type) >= 0) {
      this.expDetail = this.cardData.experience.slice();
      this.cardbackHdr = "Total Experience";
      this.cardDetailShow = "experience";
      this.cardServ.onEditGoToSlide = 2;
    } else if (["exp2"].indexOf(type) >= 0) {
      this.expDetail = this.cardData.experience.filter(exp => {
        return exp.isRelevant;
      });
      this.cardbackHdr = "Relevant Experience";
      this.cardDetailShow = "experience";
      this.cardServ.onEditGoToSlide = 2;
    } else if (["orgs"].indexOf(type) >= 0) {
      this.expDetail = this.cardData.experience.filter(exp => {
        return exp.orgName === org;
      });
      this.cardbackHdr = org;
      this.cardDetailShow = "experience";
      this.cardServ.onEditGoToSlide = 2;
      this.cardServ.onEditGoToOrg = this.cardData.experience.findIndex(exp => {
        return exp.orgName === org;
      });
    }
    this.showBack = true;
    this.cardServ.cardViewStatus = {
      side: "back",
      detailType: typ,
      detailOrg: org
    };
  }

  showFront(): void {
    this.cardServ.cardViewStatus = {
      side: "front",
      detailType: "",
      detailOrg: ""
    };
    this.cardServ.onEditGoToSlide = 0;
    this.showBack = false;
    this.cardbackHdr = "";
    this.cardDetailShow = "";
    this.expDetail = [];
  }

  downloadCard(): void {
    html2canvas(this.cardFront.nativeElement).then(canvas => {
      let cardLink = this.downloadLink.nativeElement;
      cardLink.href = canvas
        .toDataURL("image/png")
        .replace("image/jpeg", "image/octet-stream");
      cardLink.download = this.cardData.fullName + ".png";
      cardLink.click();
    });
  }
}
