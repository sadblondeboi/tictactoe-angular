import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';


import { Player } from '../models/player';
import { GameState } from './game.service';

@Injectable({
    providedIn: 'root'
})

export class PlayerService {
    private playersUrl = 'http://localhost:3000/players';
    public player1: Player = {
        id: '',
        score: 0
      };
      public player2: Player = {
        id: '',
        score: 0
      };

    public constructor(private http: HttpClient) { }

    private createPlayer(playerName: string): string {
        const player: Player = {
                id: '5d7e4fcd-5de8-4064-9980-03de6707111c',
                score: 0
        };
        localStorage.setItem(playerName, player.id);
        this.http.post<Player>(this.playersUrl, player, {headers: {'Content-Type': 'application/json'}}).subscribe();
        return player.id;
     }

    public setUpGame(): void {
        this.getPlayersIDs();
        this.getPlayerScore(this.player1.id).subscribe(player => this.player1.score = player.score);
        this.getPlayerScore(this.player2.id).subscribe(player => this.player2.score = player.score);
    }

    public getPlayersIDs(): {player1: string, player2: string} {
        const playersIDs = {
            player1: localStorage.getItem('player1'),
            player2: localStorage.getItem('player2')
        };

        playersIDs.player1 = playersIDs.player1 || this.createPlayer('player1');
        playersIDs.player2 = playersIDs.player2 || this.createPlayer('player2');

        this.player1.id = playersIDs.player1;
        this.player2.id = playersIDs.player2;

        return playersIDs;
    }

    public getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(this.playersUrl);
    }

    public setPlayerScore(player: GameState, score: number): void {
        // tslint:disable-next-line: max-line-length
        const playerId = player === GameState.Player1 ? this.player1.id : this.player2.id;
        this.http.put<Player>(`${this.playersUrl}/${playerId}`, {score}, {headers: {'Content-Type': 'application/json'}}).subscribe();
    }

    public getPlayerScore(id: string): Observable<Player> {
        return this.http.get<Player>(`${this.playersUrl}/${id}`);
    }
}
