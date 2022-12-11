import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})
export class UtilService {
    constructor(private snackBar: MatSnackBar) { }

    public getFallbackImage(event) {
        this.snackBar.open("Image could not load", "Close",
            { duration: 4000, horizontalPosition: 'right', panelClass: "snackBar-error" });
        event.target.src = '/assets/images/placeholder.png';
        event.onerror = null;
    }
}