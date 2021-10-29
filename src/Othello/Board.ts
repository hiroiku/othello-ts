import { LocationList } from '@/Othello/LocationList';
import { Square } from '@/Othello/Square';
import { Player } from '@/Othello/Player';

export interface BoardOptions {
  xAxis: string[];
  yAxis: string[];
  blank: string;
  valid: string;
}

export class Board {
  public readonly xAxis: string[];
  public readonly yAxis: string[];
  public readonly blankSquare: Square;
  public readonly validSquare: Square;
  protected readonly playerLocations = new LocationList<Player>();

  public constructor(options: BoardOptions) {
    this.xAxis = options.xAxis;
    this.yAxis = options.yAxis;
    this.blankSquare = new Square(options.blank);
    this.validSquare = new Square(options.valid);
  }

  /**
   * 石を置く
   */
  public setPiece(player: Player, x: number, y: number) {
    this.playerLocations.set(x, y, player);
  }

  /**
   * 指定したプレイヤーの石の数を取得する
   */
  public getPieces(player: Player) {
    return [...this.playerLocations].filter(([key, piece]) => piece === player).length;
  }

  /**
   * 指定した場所に置けるかどうかを判定する
   */
  public validateLocation(player: Player, x: number, y: number) {
    const flippableLocations = this.getFlippableLocations(player);
    const square = flippableLocations.get(x, y);

    return square !== undefined;
  }

  /**
   * 石を置ける場所の数を取得する
   */
  public getValidLocations(player: Player) {
    const flippableLocations = this.getFlippableLocations(player);
    const count = [...flippableLocations].length;

    return count;
  }

  /**
   * 置くことができる場所のリストを取得する
   */
  public getFlippableLocations(player: Player) {
    // 高速化のために自分の石の周囲を取得する
    const neighborLocations = new LocationList<Square>();
    this.playerLocations.forEach((p, x, y) => {
      if (p.contain(player)) {
        return;
      }

      for (let i = 0; i < 8; i++) {
        const dx = Math.round(Math.cos((45 * i * Math.PI) / 180)); // -1 | 0 | 1
        const cx = x + dx;

        const dy = Math.round(Math.sin((45 * i * Math.PI) / 180)); // -1 | 0 | 1
        const cy = y + dy;

        // 盤面外を除外する
        if (cx < 0 || cx >= this.xAxis.length || cy < 0 || cy >= this.yAxis.length) {
          continue;
        }

        // 既に石がある場所は除外する
        const square = this.playerLocations.get(cx, cy);
        if (square !== undefined) {
          continue;
        }

        neighborLocations.set(cx, cy, this.blankSquare);
      }
    });

    // 置くことができる場所を取得する
    const flippableLocations = new LocationList<Square>();
    neighborLocations.forEach((p, x, y) => {
      for (let i = 0; i < 8; i++) {
        const dx = Math.round(Math.cos((45 * i * Math.PI) / 180)); // -1 | 0 | 1
        const dy = Math.round(Math.sin((45 * i * Math.PI) / 180)); // -1 | 0 | 1

        const count = this.countFlippablePieces(player, x, y, dx, dy);
        if (count === 0) {
          continue;
        }

        flippableLocations.set(x, y, this.blankSquare);
      }
    });

    return flippableLocations;
  }

  /**
   * 指定した方向にひっくり返せる石がいくつあるか数える
   */
  public countFlippablePieces(player: Player, x: number, y: number, dx: number, dy: number) {
    let count = 0;

    for (let i = 1; ; i++) {
      const cx = x + i * dx;
      const cy = y + i * dy;
      const p = this.playerLocations.get(cx, cy);

      if (p === undefined) {
        return 0;
      }

      if (p.contain(player)) {
        return count;
      }

      count++;
    }
  }

  /**
   * 石をひっくり返す
   */
  public flip(player: Player, x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      const dx = Math.round(Math.cos((45 * i * Math.PI) / 180)); // -1 | 0 | 1
      const dy = Math.round(Math.sin((45 * i * Math.PI) / 180)); // -1 | 0 | 1
      const count = this.countFlippablePieces(player, x, y, dx, dy);

      for (let j = 0; j <= count; j++) {
        const cx = x + j * dx;
        const cy = y + j * dy;
        this.playerLocations.set(cx, cy, player);
      }
    }
  }

  /**
   * 盤面の状態を配列で取得する
   */
  public render(player?: Player) {
    const board: string[][] = [];
    board.push([' ', ...this.xAxis]);

    for (let y = 0; y < this.yAxis.length; y++) {
      const row = [];

      for (let x = 0; x < this.xAxis.length; x++) {
        const p = this.playerLocations.get(x, y);

        if (p) {
          row.push(p.toString());
          continue;
        }

        if (player) {
          const square = this.getFlippableLocations(player).get(x, y);

          if (square) {
            row.push(this.validSquare.toString());
            continue;
          }
        }

        row.push(this.blankSquare.toString());
      }

      board.push([this.yAxis[y], ...row]);
    }

    return board;
  }
}
