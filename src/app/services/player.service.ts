import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { Player } from '../models/player';
import { GameState } from './game.service';

@Injectable({
    providedIn: 'root'
})

export class PlayerService {
    private playersUrl = 'http://localhost:3000/players';

    public player1 = new Subject<Player>();
    public player2 = new Subject<Player>();

    private playerInstances: { player1?: Player, player2?: Player } = {};

    public constructor(private http: HttpClient) { }

    private createPlayer(playerName: 'player1' | 'player2'): Player {
        const player: Player = {
            id: '5d7e4fcd-5de8-4064-9980-03de6707111c',
            score: 0
        };
        localStorage.setItem(playerName, player.id);
        this.http.post<Player>(this.playersUrl, player, { headers: { 'Content-Type': 'application/json' } }).pipe(first()).subscribe(
            newPlayer => this[playerName].next(newPlayer)
        );
        return player;
    }

    public setUpGame(): void {
        this.setPlayer('player1');
        this.setPlayer('player2');
    }

    private setPlayer(playerName: 'player1' | 'player2'): void {
        const id = localStorage.getItem(playerName);

        this[playerName].subscribe(player => this.playerInstances[playerName] = player);

        if (id) {
            this.getPlayer(id).pipe(first()).subscribe(player =>  this[playerName].next(player));
        } else {
            this[playerName].next(this.createPlayer(playerName));
        }
    }

    public setPlayerScore(player: GameState, score: number): void {
        // tslint:disable-next-line: max-line-length
        const playerId = player === GameState.Player1 ? this.playerInstances.player1.id : this.playerInstances.player2.id;
        this.http.put<Player>(`${this.playersUrl}/${playerId}`, { score }, { headers: { 'Content-Type': 'application/json' } }).subscribe();
    }

    public getPlayer(id: string): Observable<Player> {
        return this.http.get<Player>(`${this.playersUrl}/${id}`);
    }
}
