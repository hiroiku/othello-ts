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
    const turn = this.context.turn;

    // 石を置く
    board.setPiece(turn.currentPlayer, input.x, input.y);

    // 石をひっくり返す
    board.flip(turn.currentPlayer, input.x, input.y);

    // ターンを進める
    turn.next();

    return BoardCheckScene;
  }
}
