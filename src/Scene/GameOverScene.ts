import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { Player } from '@/Othello/Player';

export class GameOverScene extends Scene<Context> {
  public handle(): undefined {
    const players = this.context.players;
    const board = this.context.board;
    const othello = this.context.othello;

    let maxPieces = 0;
    let winner: Player | null = null;
    for (const player of players) {
      const pieces = board.getPieces(player);

      if (pieces > maxPieces) {
        maxPieces = pieces;
        winner = player;
      }
    }

    if (winner) {
      console.log(`勝者: ${winner}`);
    } else {
      console.log('引き分け');
    }

    return;
  }
}
