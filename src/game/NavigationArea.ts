import Button from "../ui/common/Button";
import SwitchButton from "../ui/common/SwitchButton";
import eventHandler from "../contants/eventHandler";
import MiniMapScene from "../scenes/MiniMapScene";

class NavigationArea {
  private scene: Phaser.Scene;
  private upButton?: Button;
  private leftButton?: Button;
  private downButton?: Button;
  private rightButton?: Button;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public init() {
    const miniMapScene = new MiniMapScene();
    const size = 78;
    const offsetX = 575;
    const offsetY = 152;
    const dateBackground = this.scene.add.image(1618, 885, "uiDateBackground");
    const textMonthWeek = this.scene.add.text(1630, 890, "Month: 1 Week: 1", {
      font: "24px Oswald",
      color: "#4b3d44",
    });
    const textDay = this.scene.add.text(1630, 916, "Day: 1", {
      font: "32px Oswald",
      color: "#4b3d44",
    });

    this.scene.scene.add("MiniMapScene", miniMapScene);
    miniMapScene.scene.start();
    dateBackground.setOrigin(0);

    const x = this.scene.scale.gameSize.width - offsetX + size * 6;
    const y = this.scene.scale.gameSize.height - offsetY;

    const nextTurnButton = new Button(
      this.scene,
      x - size * 2,
      y + size,
      "nextTurn",
      this.handleNextTurnClick
    );
    const menuButton = new Button(
      this.scene,
      x - size,
      y + size,
      "menu",
      this.handleMenuClick
    );
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
        if (i === 0 && j === 1) {
          this.addUpButton(x, y);
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

  private addUpButton = (x: number, y: number): void => {
    this.upButton = new Button(this.scene, x, y, "arrowUp", this.handleUpClick);
  };

  private handleUpClick = (): void => {
    eventHandler.emit("up");
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
    eventHandler.emit("left");
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
    eventHandler.emit("down");
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
    eventHandler.emit("right");
  };

  private handleNextTurnClick = (): void => {};

  private handleMenuClick = (): void => {};

  private handleFullScreenClick = (): void => {
    this.scene.scale.toggleFullscreen();
  };
}

export default NavigationArea;
