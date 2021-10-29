/**
 * x, y 座標について、その座標の状態を表すクラス
 */
export class LocationList<T> {
  protected readonly positions = new Map<string, T>();

  public [Symbol.iterator]() {
    return this.positions[Symbol.iterator]();
  }

  public get(x: number, y: number) {
    return this.positions.get(`${x},${y}`);
  }

  public set(x: number, y: number, value: T) {
    this.positions.set(`${x},${y}`, value);
  }

  public clear() {
    this.positions.clear();
  }

  public forEach(callback: (value: T, x: number, y: number) => void) {
    this.positions.forEach((value, key) => {
      const [x, y] = key.split(',').map(Number);
      callback(value, x, y);
    });
  }
}
