import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { VideoGame } from "src/models/video-game";

@Injectable({
    providedIn: "root"
})
export class DataService {
    baseUrl = "http://localhost:8080/games"

    constructor(private http: HttpClient) { }

    public getAllGames(): Observable<VideoGame[]> {
        return this.http.get<VideoGame[]>(`${environment.apiUrl}/all`);
    }

    public getGameById(id: number): Observable<VideoGame> {
        return this.http.get<VideoGame>(`${environment.apiUrl}/find/${id}`);
    }

    public addGame(newGame: VideoGame): Observable<VideoGame> {
        return this.http.post<VideoGame>(`${environment.apiUrl}/add`, newGame);
    }

    public updateGame(updatedGame: VideoGame): Observable<VideoGame> {
        return this.http.put<VideoGame>(`${environment.apiUrl}/update`, updatedGame);
    }

    public deleteGame(id: number): Observable<string> {
        return this.http.delete(`${environment.apiUrl}/delete/${id}`, { responseType: 'text' });
    }
}