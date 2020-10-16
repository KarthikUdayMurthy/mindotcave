import { Injectable, OnChanges, OnInit } from "@angular/core";
import { ICard } from "./card";

@Injectable({
  providedIn: "root"
})
export class CardService implements OnInit {
  public cards: Array<ICard> = [];
  public selectedCardIndex: number = null;
  public onEditGoToSlide: number = 0;
  public onEditGoToOrg: number = -1;
  public cardViewStatus: any = { side: "front", detailType: "", detailOrg: "" };
  public showTip: boolean = true;

  ngOnInit() {}

  getCards(): Array<ICard> {
    this.cards = [
      {
        fullName: "John Smith",
        title: "Web Developer",
        email: "John.smith@gmail.com",
        phone: 9876543210,
        skills: [
          { name: "HTML", strength: 80 },
          { name: "CSS", strength: 70 },
          { name: "Javascript", strength: 70 },
          { name: "ES6", strength: 90 },
          { name: "Angular", strength: 60 },
          { name: "React", strength: 50 },
          { name: "Cordova", strength: 40 },
          { name: "Node", strength: 50 }
        ],
        experience: [
          {
            fromDate: "12/16/2013",
            toDate: "08/24/2018",
            orgName: "Microsoft",
            details:
              "My initial work involved creating large SQL queries to produce customized client reports, then became SME, also created a web tool called Dynamic Tracker which is completely dynamic and no code setup tool used for tracking and reporting employee activities in real time.",
            isRelevant: false
          },
          {
            fromDate: "08/28/2018",
            toDate: "NA",
            orgName: "Google",
            details:
              "Worked on multiple hybrid apps for insurance domain using technologies like Angular, Cordova, IBM MFP etc., My responsibilities include development, unit testing, build and deployment of hybrid apps for multiple countries.",
            isRelevant: true
          }
        ]
      },
      {
        fullName: "Karthik U",
        title: "Sr. Web Developer",
        email: "u.karthik99@gmail.com",
        phone: 9052151947,
        skills: [
          { name: "HTML", strength: 80 },
          { name: "CSS", strength: 70 },
          { name: "Javascript (ES6)", strength: 80 },
          { name: "Angular", strength: 60 },
          { name: "React", strength: 70 },
          { name: "React Native", strength: 60 },
          { name: "Cordova", strength: 40 },
          { name: "Node", strength: 50 }
        ],
        experience: [
          {
            fromDate: "12/16/2013",
            toDate: "08/24/2018",
            orgName: "ADP",
            details:
              "My initial work involved creating large SQL queries to produce customized client reports, then became SME, also created a web tool called Dynamic Tracker which is completely dynamic and no code setup tool used for tracking and reporting employee activities in real time.",
            isRelevant: false
          },
          {
            fromDate: "08/28/2018",
            toDate: "NA",
            orgName: "Cognizant",
            details:
              "Worked on multiple hybrid apps for insurance domain using technologies like Angular, React, React Native, Cordova, IBM MFP etc., My responsibilities include development, unit testing, build and deployment of hybrid apps for multiple countries.",
            isRelevant: true
          }
        ]
      }
    ];
    return this.cards;
  }

  sortExp(exp) {
    exp.sort((a, b) => {
      let f1 = new Date(a.fromDate);
      let f2 = new Date(b.fromDate);
      if (f1 < f2) {
        return 1;
      }
      if (f1 > f2) {
        return -1;
      }
      return 0;
    });
  }
}
