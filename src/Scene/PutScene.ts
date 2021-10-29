import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { BoardCheckScene } from '@/Scene/BoardCheckScene';

/**
 * 盤面に石を置くシーン
 */
export class PutScene extends Scene<Context> {
  public handle() {
    const input = this.context.input;
    const board = this.context.board;
    const othello = this.context.othello;

    // 石を置く
    board.setPiece(othello.currentPlayer, input.x, input.y);

    // 石をひっくり返す
    board.flip(othello.currentPlayer, input.x, input.y);

    // ターンを進める
    othello.next();

    return BoardCheckScene;
  }
}
