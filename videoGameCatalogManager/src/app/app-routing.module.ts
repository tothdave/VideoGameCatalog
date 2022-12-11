import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './pages/games/game-details/game-details.component';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
  {
    path: "games", children: [
      { path: "", component: GamesComponent },
      { path: "add", component: GameDetailsComponent },
      { path: "edit/:id", component: GameDetailsComponent },
    ]
  },
  { path: "", redirectTo: "/games", pathMatch: "full" },
  { path: "**", redirectTo: "/games" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
