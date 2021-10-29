import { SceneConstructor } from '@/Game/Scene';

export type GameInitializer<T> = () => T;

/**
 * ゲームのシーンを管理するクラス
 */
export class Game<T> {
  protected readonly context: T;

  public constructor(initializer: GameInitializer<T>) {
    this.context = initializer();
  }

  public run(scene: SceneConstructor<T>) {
    let currentScene = new scene(this.context);

    do {
      const nextScene = currentScene.handle();

      if (!nextScene) {
        break;
      }

      currentScene = new nextScene(this.context);
    } while (true);
  }
}
