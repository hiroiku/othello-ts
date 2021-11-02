import { Player } from '@/Othello/Player';

/**
 * プレイヤーの状態とターン数を管理するクラス
 */
export class Turn {
  protected readonly players: Player[];
  public get currentPlayer() {
    const index = this._value % this.players.length;
    const player = this.players[index];

    return player;
  }

  protected _value: number;
  public get value() {
    return this._value;
  }

  public constructor(players: Player[]) {
    this.players = players;
    this._value = 0;
  }

  public next() {
    this._value++;
  }
}
