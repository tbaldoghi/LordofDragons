import Button from "../ui/common/Button";
import SwitchButton from "../ui/common/SwitchButton";
import MiniMap from "./map/MiniMap";
import MapTile from "./MapTile";

class NavigationArea {
  private scene: Phaser.Scene;
  private turnLeftButton?: Button;
  private upButton?: Button;
  private turnRightButton?: Button;
  private leftButton?: Button;
  private downButton?: Button;
  private rightButton?: Button;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public init(map: MapTile[][]) {
    const miniMap = new MiniMap(this.scene, map);
    const size = 78;
    const offsetX = 575;
    const offsetY = 175;

    miniMap.renderMap();

    const x = this.scene.scale.gameSize.width - offsetX + size * 6;
    const y = this.scene.scale.gameSize.height - offsetY;
    const fullScreenButton = new SwitchButton(
      this.scene,
      x,
      y + size,
      "fullScreen",
      this.handleFullScreenClick
    );

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 2; j++) {
        const x = this.scene.scale.gameSize.width - offsetX + j * size;
        const y = this.scene.scale.gameSize.height - offsetY + i * size;

        if (i === 0 && j === 0) {
          this.addTurnLeftButton(x, y);
        } else if (i === 0 && j === 1) {
          this.addUpButton(x, y);
        } else if (i === 0 && j === 2) {
          this.addTurnRightButton(x, y);
        } else if (i === 1 && j === 0) {
          this.addLeftButton(x, y);
        } else if (i === 1 && j === 1) {
          this.addDownButton(x, y);
        } else if (i === 1 && j === 2) {
          this.addRigthButton(x, y);
        }
      }
    }
  }

  private addTurnLeftButton = (x: number, y: number): void => {
    this.turnLeftButton = new Button(
      this.scene,
      x,
      y,
      "arrowTurnLeft",
      this.handleTurnLeftClick
    );
  };

  private handleTurnLeftClick = (): void => {
    console.log("TODO: emit turn left");
  };

  private addUpButton = (x: number, y: number): void => {
    this.upButton = new Button(this.scene, x, y, "arrowUp", this.handleUpClick);
  };

  private handleUpClick = (): void => {
    console.log("TODO: emit up");
  };

  private addTurnRightButton = (x: number, y: number): void => {
    this.turnRightButton = new Button(
      this.scene,
      x,
      y,
      "arrowTurnRight",
      this.handleTurnRightClick
    );
  };

  private handleTurnRightClick = (): void => {
    console.log("TODO: emit turn right");
  };

  private addLeftButton = (x: number, y: number): void => {
    this.leftButton = new Button(
      this.scene,
      x,
      y,
      "arrowLeft",
      this.handleLeftClick
    );
  };

  private handleLeftClick = (): void => {
    console.log("TODO: emit left");
  };

  private addDownButton = (x: number, y: number): void => {
    this.downButton = new Button(
      this.scene,
      x,
      y,
      "arrowDown",
      this.handleDownClick
    );
  };

  private handleDownClick = (): void => {
    console.log("TODO: emit down");
  };

  private addRigthButton = (x: number, y: number): void => {
    this.rightButton = new Button(
      this.scene,
      x,
      y,
      "arrowRight",
      this.handleRightClick
    );
  };

  private handleRightClick = (): void => {
    console.log("TODO: emit right");
  };

  private handleFullScreenClick = (): void => {
    this.scene.scale.toggleFullscreen();
  };
}

export default NavigationArea;
