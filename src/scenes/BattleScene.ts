import Phaser from "phaser";
import Wolf from "../game/creature/Wolf";
import MessageArea from "../game/MessageArea";
import PortraitArea from "../game/PortraitArea";
import Button from "../ui/common/Button";
import SwitchButton from "../ui/common/SwitchButton";
import FloatMenuScene from "./FloatMenuScene";

class BattleScene extends Phaser.Scene {
  private _portraitArea: PortraitArea;
  private _messageArea: MessageArea;

  constructor() {
    super("BattleScene");

    this._portraitArea = new PortraitArea(this);
    this._messageArea = new MessageArea(this);
  }

  preload(): void {
    const path = "assets/images";
    this.load.image(
      "forestBattle",
      `${path}/background/forest/forest_battle.png`
    );
    this.load.spritesheet("attack", `${path}/ui/attack_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("potion", `${path}/ui/potion_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    const uiBackground = this.add.image(0, 0, "uiBackground");
    const uiBorder = this.add.image(0, 0, "uiBorder");
    const uiRightBack = this.add.image(1288, 0, "uiRightBack");
    const forest = this.add.image(0, 0, "forestBattle");

    for (let i = 0; i < 4; i++) {
      const wolf = new Wolf(this, 1280 / 4 + 50 + i * 200, 570, true);
    }

    const size = 78;
    const offsetX = 575;
    const offsetY = 250;
    const x = this.scale.gameSize.width - offsetX + size * 6;
    const y = this.scale.gameSize.height - offsetY;
    const fullScreenButton = new SwitchButton(
      this,
      x,
      y + size + 75,
      "fullScreen",
      this.handleFullScreenClick
    );

    uiBackground.setOrigin(0);
    uiBorder.setOrigin(0);
    uiRightBack.setOrigin(0);
    forest.setOrigin(0);
    this._messageArea.showMessages();

    const portraitSpace = 300;
    const portraitOffsetX = 400;
    const portraitOffsetY = 100;
    const portraits = [
      ["portrait", "emptyPortrait"],
      ["emptyPortrait", "emptyPortrait"],
    ];

    portraits.forEach((row: string[], i: number): void => {
      const portraitY = portraitOffsetY + i * portraitSpace;

      row.forEach((portrait: string, j: number) => {
        const portraitX =
          this.scale.gameSize.width - portraitOffsetX + j * portraitSpace;

        this.add.image(portraitX, portraitY, portrait);

        const attackButton = new Button(
          this,
          portraitX - 100,
          portraitY - 32,
          "attack",
          () => {},
          i !== 0 || j !== 0
        );
        const potionButton = new Button(
          this,
          portraitX - 164,
          portraitY - 32,
          "potion",
          () => {},
          i !== 0 || j !== 0
        );
        let count = 0;

        attackButton.on("pointerup", () => {
          this.handleCreateFloatMenu(
            count,
            portraitX + i * 155 - 128,
            portraitY + 32
          );
          count++;
        });

        const castButton = new Button(
          this,
          portraitX - 100,
          portraitY + 32,
          "cast",
          () => {},
          i !== 0 || j !== 0
        );
        const actionButton = new Button(
          this,
          portraitX - 164,
          portraitY + 32,
          "flag",
          () => {},
          i !== 0 || j !== 0
        );
      });
    });
  }

  handleFullScreenClick = (): void => {
    this.scale.toggleFullscreen();
  };

  handleCreateFloatMenu = (key: number, x: number, y: number): void => {
    const floatMenu = this.add.zone(x - 150, y - 100, 300, 200);

    floatMenu.setInteractive();
    floatMenu.setOrigin(0);

    const floatMenuScene = new FloatMenuScene(key, floatMenu);

    this.scene.add(`FloatMenuScene${key}`, floatMenuScene);
    floatMenuScene.scene.start();
  };
}

export default BattleScene;
