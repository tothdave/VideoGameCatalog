import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGame } from 'src/models/video-game';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public searchValue: string = "";
  public games: VideoGame[] = [];

  constructor(private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.getAllGames();
  }

  public getAllGames(): void {
    this.dataService.getAllGames().subscribe((response) => {
      this.games = response;
    })
  }

  public searchGames(): VideoGame[] {
    if (this.searchValue === "") {
      return this.games;
    }
    return this.games.filter((game) => {
      return game.name?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        game.developer?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        game.genre?.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        game.playerMode?.toLowerCase().includes(this.searchValue.toLowerCase())
    })
  }

  public navigateToAddGame(): void {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  public deleteGame(event): void {
    this.dataService.deleteGame(event,).subscribe({
      next: (response) => {
        this.games = this.games.filter((game) => game.id != event)
        this.snackBar.open('Game Deleted', "Close",
          { duration: 2000, horizontalPosition: 'right', panelClass: "snackBar-success" });
      },
      error: (e) => {
        this.snackBar.open(e.error.message, "Close",
          { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
      }
    })
  }

}
