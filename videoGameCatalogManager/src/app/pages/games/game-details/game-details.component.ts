import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { VideoGame } from 'src/models/video-game';
import { DataService } from 'src/services/data.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  public gameDetailsForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    developer: new FormControl(null, Validators.required),
    genre: new FormControl(null),
    playerMode: new FormControl(null),
    description: new FormControl(null),
    imageUrl: new FormControl(null, Validators.required)
  })

  public operation: string = "";
  public id: string = "";

  constructor(private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public utilService: UtilService) {
  }

  public ngOnInit(): void {
    this.getSegmentsFromUrl(this.router.url)
    if (this.id) {
      this.getGameData();
    }
  }

  public getGameData(): void {
    this.dataService.getGameById(+this.id).subscribe({
      next: (response: VideoGame) => {
        this.gameDetailsForm.setValue(response);
      },
      error: (e) => {
        this.snackBar.open(e.error.message, "Close",
          { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
        this.router.navigate(["/games"])
      }
    })
  }

  private getSegmentsFromUrl(url: string): void {
    let urlArray = url.split("/")
    this.operation = urlArray[2];
    this.id = urlArray[3];
  }

  public navigateBack(): void {
    this.router.navigate(["/games"])
  }

  public saveGame(): void {
    if (this.gameDetailsForm.invalid) {
      this.gameDetailsForm.markAllAsTouched();
      return
    }
    const gameToBeSaved: VideoGame = {
      id: this.gameDetailsForm.value.id,
      name: this.gameDetailsForm.value.name,
      developer: this.gameDetailsForm.value.developer,
      genre: this.gameDetailsForm.value.genre,
      playerMode: this.gameDetailsForm.value.playerMode,
      description: this.gameDetailsForm.value.description,
      imageUrl: this.gameDetailsForm.value.imageUrl
    }

    if (this.operation === "add") {
      this.dataService.addGame(gameToBeSaved).subscribe({
        next: (response) => {
          this.snackBar.open('Game Saved', "Close",
            { duration: 2000, horizontalPosition: 'right', panelClass: "snackBar-success" });
          this.router.navigate([`/games/edit/${response.id}`])
        },
        error: (e) => {
          this.snackBar.open(e.error.message, "Close",
            { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
        }
      })
    }
    if (this.operation === "edit") {
      this.dataService.updateGame(gameToBeSaved).subscribe({
        next: (response) => {
          this.snackBar.open('Game Saved', "Close",
            { duration: 2000, horizontalPosition: 'right', panelClass: "snackBar-success" });
        },
        error: (e) => {
          this.snackBar.open(e.error.message, "Close",
            { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
        }
      })
    }
  }

  public deleteGame(): void {
    this.dataService.deleteGame(+this.id).subscribe({
      next: (response) => {
        this.snackBar.open('Game Deleted', "Close",
          { duration: 2000, horizontalPosition: 'right', panelClass: "snackBar-success" });
        this.router.navigate(["/games"]);
      },
      error: (e) => {
        this.snackBar.open(e.error.message, "Close",
          { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
      }
    })
  }

  public openDeletePrompt(): void {
    // Need to detach form change detection because of performance issue
    this.cdr.detach();

    let dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        data: { name: this.gameDetailsForm.value.name, operation: "Delete" }
      });

    dialogRef.afterClosed().subscribe((result) => {
      // Reattach here
      this.cdr.reattach();

      if (result === "Delete") {
        this.deleteGame();
      }
    })
  }
}
