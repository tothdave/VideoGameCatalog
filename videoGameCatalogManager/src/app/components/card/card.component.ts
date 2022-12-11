import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoGame } from 'src/models/video-game';
import { UtilService } from 'src/services/util.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data: VideoGame;
  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public utilService: UtilService) { }

  public ngOnInit(): void {
  }

  public editGame(): void {
    this.router.navigate([`edit/${this.data?.id}`], { relativeTo: this.activatedRoute })
  }

  public openDeleteDialog(): void {
    // Need to detach form change detection because of performance issue
    this.cdr.detach();

    let dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        data: { name: this.data?.name, operation: "Delete" }
      });

    dialogRef.afterClosed().subscribe((result) => {
      // Reattach here
      this.cdr.reattach();
      if (result === "Delete") {
        this.deleteEmitter.emit(this.data.id)
      }
    })
  }

}
