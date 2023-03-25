import commentaryManager from "../contants/commentaryManager";
import eventHandler from "../contants/eventHandler";
import StatusBarTypes from "../enums/StatusBarTypes";
import { CommentaryEvent } from "../game/CommentaryManager";
import Button from "../ui/common/Button";
import StatusBar from "../ui/common/StatusBar";
import SwitchButton from "../ui/common/SwitchButton";
import FloatMessageScene from "./FloatMessageScene";
import MiniMapScene from "./MiniMapScene";

class GameUIScene extends Phaser.Scene {
  private upButton?: Button;
  private leftButton?: Button;
  private downButton?: Button;
  private rightButton?: Button;

  constructor() {
    super("GameUIScene");
  }

  create(): void {
    const uiRightBack = this.add.image(1288, 0, "uiRightBack");
    const uiMapBorder = this.add.image(1308, 8, "uiMapBorder");
    const miniMapScene = new MiniMapScene();
    const portraitSize = 155;
    const statusBarOffset = 16;
    const portraitOffsetX = 550;
    const portraitOffsetY = 380;
    const portraitY = this.scale.gameSize.height - portraitOffsetY;
    const portraits = ["portrait1", "portrait3", "portrait3", "emptyPortrait"];
    const navigationSize = 78;
    const navigationOffsetX = 575;
    const navigationOffsetY = 152;
    const dateBackground = this.add.image(1618, 885, "uiDateBackground");
    const textMonthWeek = this.add.text(1630, 890, "Month: 1 Week: 1", {
      font: "24px Oswald",
      color: "#4b3d44",
    });
    const textDay = this.add.text(1630, 916, "Day: 1", {
      font: "32px Oswald",
      color: "#4b3d44",
    });

    uiRightBack.setOrigin(0);
    uiMapBorder.setOrigin(0);
    this.scene.add("MiniMapScene", miniMapScene);
    miniMapScene.scene.start();
    dateBackground.setOrigin(0);

    portraits.forEach((portrait: string, index: number): void => {
      const x =
        this.scale.gameSize.width - portraitOffsetX + index * portraitSize;

      const healthBar = new StatusBar(
        this,
        StatusBarTypes.health,
        x - 60,
        portraitY - 76
      );
      const manaBar = new StatusBar(
        this,
        StatusBarTypes.mana,
        x - 60,
        portraitY - (76 - statusBarOffset)
      );
      const staminaBar = new StatusBar(
        this,
        StatusBarTypes.stamina,
        x - 60,
        portraitY - (76 - statusBarOffset * 2)
      );

      this.add.image(x, portraitY + 36, portrait);

      const inventoryButton = new Button(
        this,
        x - 32,
        portraitY + 136,
        "inventory",
        () => {},
        portrait === "emptyPortrait"
      );
      const bookButton = new Button(
        this,
        x + 32,
        portraitY + 136,
        "book",
        () => {},
        portrait === "emptyPortrait"
      );
    });

    eventHandler.on("showCommentary", this.handleFloatMesage);

    const navigationX =
      this.scale.gameSize.width - navigationOffsetX + navigationSize * 6;
    const navigationY = this.scale.gameSize.height - navigationOffsetY;

    const nextTurnButton = new Button(
      this,
      navigationX - navigationSize * 2,
      navigationY + navigationSize,
      "nextTurn",
      this.handleNextTurnClick
    );
    const menuButton = new Button(
      this,
      navigationX - navigationSize,
      navigationY + navigationSize,
      "menu",
      this.handleMenuClick
    );
    const fullScreenButton = new SwitchButton(
      this,
      navigationX,
      navigationY + navigationSize,
      "fullScreen",
      this.handleFullScreenClick
    );

    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 2; j++) {
        const x =
          this.scale.gameSize.width - navigationOffsetX + j * navigationSize;
        const y =
          this.scale.gameSize.height - navigationOffsetY + i * navigationSize;

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
    this.upButton = new Button(this, x, y, "arrowUp", this.handleUpClick);
  };

  private handleUpClick = (): void => {
    eventHandler.emit("up");
  };

  private addLeftButton = (x: number, y: number): void => {
    this.leftButton = new Button(this, x, y, "arrowLeft", this.handleLeftClick);
  };

  private handleLeftClick = (): void => {
    eventHandler.emit("left");
  };

  private addDownButton = (x: number, y: number): void => {
    this.downButton = new Button(this, x, y, "arrowDown", this.handleDownClick);
  };

  private handleDownClick = (): void => {
    eventHandler.emit("down");
  };

  private addRigthButton = (x: number, y: number): void => {
    this.rightButton = new Button(
      this,
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
    this.scale.toggleFullscreen();
  };

  private handleFloatMesage = (commentaryEvent: CommentaryEvent): void => {
    if (!this.scene.isActive("FloatMessageScene")) {
      const floatMessageZone = this.add.zone(
        this.scale.gameSize.width - 550,
        this.scale.gameSize.height - 340,
        200,
        128
      );
      const quote = commentaryManager.selectQuote(commentaryEvent);

      floatMessageZone.setOrigin(0);

      const floatMessageScene = new FloatMessageScene(floatMessageZone, quote);
      this.scene.add("FloatMessageScene", floatMessageScene);
      floatMessageScene.scene.start();
    }
  };
}

export default GameUIScene;
