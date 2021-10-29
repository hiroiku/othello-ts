import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { Player } from '@/Othello/Player';

/**
 * ゲームオーバーシーン
 * 勝者の判定を行う
 */
export class GameOverScene extends Scene<Context> {
  public handle() {
    const players = this.context.players;
    const board = this.context.board;

    // 最も石の数が多いプレイヤーを取得する
    let maxPieces = 0;
    let winner: Player | null = null;
    for (const player of players) {
      const pieces = board.getPieces(player);

      if (pieces > maxPieces) {
        maxPieces = pieces;
        winner = player;
      }
    }

    // 勝者を表示する
    if (winner) {
      console.log(`勝者: ${winner}`);
    } else {
      console.log('引き分け');
    }
  }
}
