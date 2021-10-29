import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { GameOverScene } from '@/Scene/GameOverScene';
import { RenderingScene } from '@/Scene/RenderingScene';

/**
 * ボードの状態によってゲームを継続するかどうかを判定するシーン
 */
export class BoardCheckScene extends Scene<Context> {
  public handle() {
    const board = this.context.board;

    // 全員が石を置けない場合はゲームオーバー
    const players = this.context.players;
    let isGameOver = true;
    for (const player of players) {
      const validLocations = board.getValidLocations(player);

      if (validLocations) {
        isGameOver = false;
      }
    }

    if (isGameOver) {
      return GameOverScene;
    }

    // 置ける石がない場合はパスする
    const othello = this.context.othello;
    const validLocations = board.getValidLocations(othello.currentPlayer);
    if (!validLocations) {
      console.log('置ける石が無いのでパスします。');
      console.log('');
      othello.next();
    }

    return RenderingScene;
  }
}
