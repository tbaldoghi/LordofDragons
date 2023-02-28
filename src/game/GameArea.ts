import MapSize from "../interfaces/MapSize";
import Wolf from "./creature/Wolf";
import eventHandler from "../contants/eventHandler";

class GameArea {
  private scene: Phaser.Scene;
  private _mousePositionX: number;
  private _mousePositionY: number;
  private readonly width = 1280;
  private readonly heigth = 800;
  direction = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this._mousePositionX = 0;
    this._mousePositionY = 0;
  }

  public init(mapSize: MapSize): void {
    const forest = this.scene.add.sprite(0, 0, "forest");
    const wolf = new Wolf(this.scene, this.width / 2, 590);

    forest.setOrigin(0);
    forest.setScale(4);
    forest.setFrame(0);

    eventHandler.on(
      "turnRight",
      () => {
        this.direction < 3 ? this.direction++ : (this.direction = 0);
        forest.setFrame(this.direction);
      },
      this.scene
    );

    eventHandler.on(
      "turnLeft",
      () => {
        this.direction > 0 ? this.direction-- : (this.direction = 3);
        forest.setFrame(this.direction);
      },
      this.scene
    );
  }

  public setMousePosition(x: number, y: number): void {
    this._mousePositionX = x;
    this._mousePositionY = y;
  }
}

export default GameArea;
