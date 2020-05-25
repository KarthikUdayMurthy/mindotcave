import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CardService } from './card.service'

@Injectable({
  providedIn: 'root',
})
export class CardGuard implements CanActivate {
  constructor(private cardServ: CardService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // console.log('CardGuard#canActivate called');
     return (this.cardServ.selectedCardIndex !== null && this.cardServ.selectedCardIndex >= 0)
  }
}