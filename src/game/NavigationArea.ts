import Button from "../ui/common/Button";
import SwitchButton from "../ui/common/SwitchButton";
import MiniMap from "./map/MiniMap";
import MapTile from "./MapTile";

class NavigationArea {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  public init(map: MapTile[][]) {
    const miniMap = new MiniMap(this._scene, map);
    miniMap.renderMap();
    const size = 78;
    const offsetX = 575;
    const offsetY = 175;
    const buttonNames = [
      ["arrowTurnLeft", "arrowUp", "arrowTurnRight"],
      ["arrowLeft", "arrowDown", "arrowRight"],
    ];

    buttonNames.forEach((names: string[], i: number): void => {
      names.forEach((name: string, j: number): void => {
        const x = this._scene.scale.gameSize.width - offsetX + j * size;
        const y = this._scene.scale.gameSize.height - offsetY + i * size;

        new Button(this._scene, x, y, name, () => {});
      });
    });

    const x = this._scene.scale.gameSize.width - offsetX + size * 6;
    const y = this._scene.scale.gameSize.height - offsetY;
    const fullScreenButton = new SwitchButton(
      this._scene,
      x,
      y + size,
      "fullScreen",
      this.handleFullScreenClick
    );
  }

  handleFullScreenClick = (): void => {
    this._scene.scale.toggleFullscreen();
  };
}

export default NavigationArea;
