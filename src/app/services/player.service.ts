import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

import { Player } from '../models/player';

@Injectable({
    providedIn: 'root'
})

export class PlayerService {
    private playersUrl = 'http://localhost:3000/players';

    public constructor(private http: HttpClient) { }

    private createPlayer(playerName: string): string {
        const player: Player = {
            id: uuidv4(),
            score: 0
        };
        localStorage.setItem(playerName, player.id);
        this.http.post<Player>(this.playersUrl, player, {headers: {'Content-Type': 'application/json'}}).subscribe();
        return player.id;
     }

    public getPlayersIDs(): {player1: string, player2: string} {
        const playersIDs = {
            player1: localStorage.getItem('player1'),
            player2: localStorage.getItem('player2')
        };

        playersIDs.player1 = playersIDs.player1 || this.createPlayer('player1');
        playersIDs.player2 = playersIDs.player2 || this.createPlayer('player2');

        return playersIDs;
    }

    public getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(this.playersUrl);
    }



    public addPoint(player: Player): void {
        player.score += 1;
    }

    public resetPoints(player: Player): void {
        player.score = 0;
    }
}