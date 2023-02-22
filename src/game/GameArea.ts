import MapSize from "../interfaces/MapSize";
import Wolf from "./creature/Wolf";

class GameArea {
  private _scene: Phaser.Scene;
  private _mousePositionX: number;
  private _mousePositionY: number;
  private readonly _width = 1280;
  private readonly _heigth = 800;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._mousePositionX = 0;
    this._mousePositionY = 0;
  }

  public init(mapSize: MapSize): void {
    const forest = this._scene.add.image(0, 0, "forest");

    const wolf2 = new Wolf(this._scene, this._width / 2 - 10, 390);
    const wolf3 = new Wolf(this._scene, this._width / 2 + 10, 410);
    const wolf = new Wolf(this._scene, this._width / 2, 570);
    wolf2.setScale(0.1);
    wolf3.setScale(0.25);
    forest.setOrigin(0);
  }

  public setMousePosition(x: number, y: number): void {
    this._mousePositionX = x;
    this._mousePositionY = y;
  }
}

export default GameArea;
