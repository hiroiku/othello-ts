import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { InputScene } from '@/Scene/InputScene';

export class RenderingScene extends Scene<Context> {
  public handle() {
    // 盤面のレンダリング
    const board = this.context.board;
    const othello = this.context.othello;
    const rows = board.render(othello.currentPlayer);
    for (const row of rows) {
      console.log(row.join(' '));
    }
    console.log('');

    // プレイヤーの石数を表示する
    const players = this.context.players;
    for (const player of players) {
      console.log(`${player}: ${board.getPieces(player)}`);
    }
    console.log('');

    return InputScene;
  }
}
