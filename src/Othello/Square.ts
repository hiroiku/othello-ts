/**
 * オセロ盤面の 1 マスを表すクラス
 */
export class Square {
  private character: string;

  public constructor(character: string) {
    this.character = character;
  }

  public toString() {
    return this.character;
  }

  public contain(square: Square) {
    return this.character === square.character;
  }
}
