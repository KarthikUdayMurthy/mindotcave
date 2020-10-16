import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditorComponent } from "./editor/editor.component";
import { CardGuard } from "./shared/card.guard";

export const routes: Routes = [
  { path: "card", component: CardComponent, canActivate: [CardGuard] },
  { path: "editor", component: EditorComponent, canActivate: [CardGuard] },
  { path: "home", component: DashboardComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRouting {}
