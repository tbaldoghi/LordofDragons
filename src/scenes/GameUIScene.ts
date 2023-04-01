import commentaryManager from "../contants/commentaryManager";
import dateManager from "../contants/dateManager";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import Events from "../enums/Events";
import StatusBarTypes from "../enums/StatusBarTypes";
import { CommentaryEvent } from "../game/CommentaryManager";
import Mercenary from "../game/Mercenary";
import Player from "../game/Player";
import Button from "../ui/common/Button";
import StatusBar from "../ui/common/StatusBar";
import SwitchButton from "../ui/common/SwitchButton";
import FloatMessageScene from "./FloatMessageScene";
import MiniMapScene from "./MiniMapScene";

class GameUIScene extends Phaser.Scene {
  #upButton?: Button;
  #leftButton?: Button;
  #downButton?: Button;
  #rightButton?: Button;
  #dayText!: Phaser.GameObjects.Text;
  #weekMonthText!: Phaser.GameObjects.Text;
  #characters: (Player | Mercenary)[] = [];
  #healthBars: StatusBar[] = [];
  #manaBars: StatusBar[] = [];
  #movementBars: StatusBar[] = [];

  constructor() {
    super("GameUIScene");

    this.#characters = [player, ...player.mercenaries];
  }

  create(): void {
    const uiRightBack = this.add.image(1288, 0, "uiRightBack");
    const uiMapBorder = this.add.image(1308, 8, "uiMapBorder");
    const dateBackground = this.add.image(1618, 885, "uiDateBackground");
    const miniMapScene = new MiniMapScene();
    const portraitSize = 155;
    const statusBarOffset = 16;
    const portraitOffsetX = 550;
    const portraitOffsetY = 380;
    const portraitY = this.scale.gameSize.height - portraitOffsetY;
    const navigationSize = 78;
    const navigationOffsetX = 575;
    const navigationOffsetY = 152;
    const { day, week, month } = dateManager;

    this.#dayText = this.add.text(1630, 916, `Day: ${day}`, {
      font: "32px Oswald",
      color: "#4b3d44",
    });
    this.#weekMonthText = this.add.text(
      1630,
      890,
      `Month: ${month} Week: ${week}`,
      {
        font: "24px Oswald",
        color: "#4b3d44",
      }
    );

    uiRightBack.setOrigin(0);
    uiMapBorder.setOrigin(0);
    dateBackground.setOrigin(0);
    this.scene.add("MiniMapScene", miniMapScene);
    miniMapScene.scene.start();

    for (let i = 0; i < 4; i++) {
      const x = this.scale.gameSize.width - portraitOffsetX + i * portraitSize;

      if (i < this.#characters.length) {
        const {
          portrait,
          currentHealth,
          health,
          currentMana,
          mana,
          currentMovement,
          movement,
        } = this.#characters[i];

        this.#healthBars.push(
          new StatusBar(this, StatusBarTypes.health, x - 60, portraitY - 76)
        );
        this.#healthBars[i].calculateCurrentValue(currentHealth, health);
        this.#manaBars.push(
          new StatusBar(
            this,
            StatusBarTypes.mana,
            x - 60,
            portraitY - (76 - statusBarOffset)
          )
        );
        this.#manaBars[i].calculateCurrentValue(currentMana, mana);
        this.#movementBars.push(
          new StatusBar(
            this,
            StatusBarTypes.movement,
            x - 60,
            portraitY - (76 - statusBarOffset * 2)
          )
        );
        this.#movementBars[i].calculateCurrentValue(currentMovement, movement);

        this.add.image(x, portraitY + 36, portrait);

        const inventoryButton = new Button(
          this,
          x - 32,
          portraitY + 136,
          "inventory",
          () => {}
        );
        const bookButton = new Button(
          this,
          x + 32,
          portraitY + 136,
          "book",
          () => {}
        );
      } else {
        this.add.image(x, portraitY + 36, "emptyPortrait");

        const inventoryButton = new Button(
          this,
          x - 32,
          portraitY + 136,
          "inventory",
          () => {},
          true
        );
        const bookButton = new Button(
          this,
          x + 32,
          portraitY + 136,
          "book",
          () => {},
          true
        );
      }
    }

    eventHandler.on(Events.showCommentary, this.handleFloatMesage);
    eventHandler.on(Events.redrawGameStatusBar, this.redrawStatusBars);

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
    this.#upButton = new Button(this, x, y, "arrowUp", this.handleUpClick);
  };

  private handleUpClick = (): void => {
    eventHandler.emit(Events.up);
  };

  private addLeftButton = (x: number, y: number): void => {
    this.#leftButton = new Button(
      this,
      x,
      y,
      "arrowLeft",
      this.handleLeftClick
    );
  };

  private handleLeftClick = (): void => {
    eventHandler.emit(Events.left);
  };

  private addDownButton = (x: number, y: number): void => {
    this.#downButton = new Button(
      this,
      x,
      y,
      "arrowDown",
      this.handleDownClick
    );
  };

  private handleDownClick = (): void => {
    eventHandler.emit(Events.down);
  };

  private addRigthButton = (x: number, y: number): void => {
    this.#rightButton = new Button(
      this,
      x,
      y,
      "arrowRight",
      this.handleRightClick
    );
  };

  private handleRightClick = (): void => {
    eventHandler.emit(Events.right);
  };

  private handleNextTurnClick = (): void => {
    dateManager.nextDay();
    player.rest();
    eventHandler.emit(Events.redrawGameStatusBar);
    this.redrawDate();
  };

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

  private redrawStatusBars = (): void => {
    this.#characters.forEach(
      (character: Player | Mercenary, index: number): void => {
        const {
          currentHealth,
          health,
          currentMana,
          mana,
          currentMovement,
          movement,
        } = character;

        this.#healthBars[index].calculateCurrentValue(currentHealth, health);
        this.#manaBars[index].calculateCurrentValue(currentMana, mana);
        this.#movementBars[index].calculateCurrentValue(
          currentMovement,
          movement
        );
      }
    );
  };

  private redrawDate = (): void => {
    const { day, week, month } = dateManager;

    this.#dayText.text = `Day: ${day}`;
    this.#weekMonthText.text = `Month: ${month} Week: ${week}`;
  };
}

export default GameUIScene;
