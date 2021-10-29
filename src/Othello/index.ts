import { Player } from '@/Othello/Player';

export class Othello {
  protected readonly players: Player[];
  public get currentPlayer() {
    const index = this._turn % this.players.length;
    const player = this.players[index];

    return player;
  }

  protected _turn: number;
  public get turn() {
    return this._turn;
  }

  public constructor(players: Player[]) {
    this.players = players;
    this._turn = 0;
  }

  public next() {
    this._turn++;
  }
}
