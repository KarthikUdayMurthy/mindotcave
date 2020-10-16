import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import Swiper from "swiper";
import { ICard } from "../shared/card";
import { CardService } from "../shared/card.service";

@Component({
  selector: "editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"]
})
export class EditorComponent implements OnInit, AfterViewInit {
  constructor(public cardServ: CardService) {}

  swiper: Swiper;
  card: ICard;
  onInitGoToSlide: number = 0;
  onInitGoToOrg: number = 0;
  experienceEdit = false;
  experienceEditItem: any = null;
  experienceEditIndex: number = 0;
  expFormValid: boolean = true;

  @ViewChild("skillForm", null) private skillForm: ElementRef;

  ngOnInit() {
    this.card = this.cardServ.cards[this.cardServ.selectedCardIndex];
    this.onInitGoToSlide = this.cardServ.onEditGoToSlide;
    this.onInitGoToOrg = this.cardServ.onEditGoToOrg;
    this.experienceEditItem = this.card.experience[0];
    this.cardServ.sortExp(this.card.experience);
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(".editorWrap", {
      effect: "cube",
      // speed: 400,
      initialSlide: 0,
      grabCursor: true,
      cubeEffect: {
        shadow: false,
        slideShadows: false,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    });
    setTimeout(() => {
      this.swiper.slideTo(this.onInitGoToSlide);
      if (this.onInitGoToSlide === 2 && this.onInitGoToOrg > -1) {
        this.editExp(this.onInitGoToOrg);
      }
    }, 300);
  }

  goNext() {
    this.swiper.slideNext();
    if (this.experienceEdit) {
      this.saveExp();
    }
  }

  goPrev() {
    this.swiper.slidePrev();
  }

  addSkill() {
    this.card.skills.push({ name: "", strength: null });
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  removeSkill(ind) {
    this.card.skills.splice(ind, 1);
  }

  addExp() {
    this.card.experience.push({
      fromDate: "",
      toDate: "",
      orgName: "",
      details: "",
      isRelevant: false
    });
    this.experienceEditItem = this.card.experience[
      this.card.experience.length - 1
    ];
    this.experienceEditIndex = this.card.experience.length - 1;
    this.experienceEdit = true;
    this.expFormValid = true;
  }

  removeExp(ind = this.experienceEditIndex) {
    this.card.experience.splice(ind, 1);
    this.experienceEdit = false;
  }

  editExp(ind) {
    this.experienceEditItem = this.card.experience[ind];
    this.experienceEditIndex = ind;
    this.experienceEdit = true;
    this.expFormValid = true;
  }

  saveExp() {
    let exp = this.experienceEditItem;
    if (
      exp.orgName.trim() === "" ||
      exp.fromDate.trim() === "" ||
      exp.toDate.trim() === "" ||
      exp.details.trim() === ""
    ) {
      this.expFormValid = false;
    } else {
      this.experienceEdit = false;
      this.cardServ.sortExp(this.card.experience);
    }
  }

  toggleExpCurrentStatus() {
    this.experienceEditItem.toDate =
      this.experienceEditItem.toDate === "NA" ? "" : "NA";
  }

  scrollToBottom(): void {
    try {
      this.skillForm.nativeElement.scrollTop = this.skillForm.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
