export type SceneConstructor<T> = new (context: T) => Scene<T>;

export abstract class Scene<T> {
  public abstract handle(): SceneConstructor<T> | void;

  protected readonly context: T;

  public constructor(context: T) {
    this.context = context;
  }
}