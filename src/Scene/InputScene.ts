import readline from 'readline-sync';
import { Context } from '@/main';
import { Scene } from '@/Game/Scene';
import { PutScene } from '@/Scene/PutScene';

/**
 * 盤面に石を置く位置を入力するシーン
 */
export class InputScene extends Scene<Context> {
  /**
   * 横軸の目盛りから添字に変換する
   */
  protected convertXAxis(value: string) {
    return this.context.board.xAxis.indexOf(value);
  }

  /**
   * 縦軸の目盛りから添字に変換する
   */
  protected convertYAxis(value: string) {
    return this.context.board.yAxis.indexOf(value);
  }

  public handle() {
    const input = this.context.input;
    const board = this.context.board;
    const othello = this.context.othello;

    // ターン数と手番のプレイヤー名を表示する
    console.log(`${othello.turn + 1}: ${othello.currentPlayer} の番です。`);

    // 入力例を表示する
    const xAxis = board.xAxis;
    const xRead = xAxis[Math.floor(xAxis.length / 2)];
    const yAxis = board.yAxis;
    const yRead = yAxis[Math.floor(yAxis.length / 2)];
    console.log(`石を置く場所を入力してください (例: ${xRead}${yRead})。`);

    // 石を置く場所を入力する
    do {
      // 入力を受け付ける
      const [ix, iy] = readline.question('> ').replace(/\s+/g, '').split('');
      const x = this.convertXAxis(ix);
      const y = this.convertYAxis(iy);

      // 横軸に存在する値であるかを確認する
      if (!~x) {
        console.log(`横軸は [${board.xAxis.join(', ')}] で入力してください。`);
        continue;
      }

      // 縦軸に存在する値であるかを確認する
      if (!~y) {
        console.log(`縦軸は [${board.yAxis.join(', ')}] で入力してください。`);
        continue;
      }

      // 石を置けるかを確認する
      if (!board.validateLocation(othello.currentPlayer, x, y)) {
        console.log(`${ix}${iy} には ${othello.currentPlayer} を置くことができません。`);
        continue;
      }

      input.x = x;
      input.y = y;

      break;
    } while (true);

    console.log('');

    return PutScene;
  }
}
