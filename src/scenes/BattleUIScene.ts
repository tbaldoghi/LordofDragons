import StatusBarTypes from "../enums/StatusBarTypes";
import Button from "../ui/common/Button";
import StatusBar from "../ui/common/StatusBar";
import FloatMenuScene from "./FloatMenuScene";

class BattleUIScene extends Phaser.Scene {
  constructor() {
    super("BattleUIScene");
  }

  create(): void {
    const uiRightBattleBack = this.add.image(1288, 0, "uiRightBattleBack");

    uiRightBattleBack.setOrigin(0);

    const portraitSpace = 300;
    const portraitOffsetX = 400;
    const portraitOffsetY = 200;
    const portraits = [
      ["portrait", "emptyPortrait"],
      ["emptyPortrait", "emptyPortrait"],
    ];

    portraits.forEach((row: string[], i: number): void => {
      const portraitY = portraitOffsetY + i * portraitSpace;

      row.forEach((portrait: string, j: number) => {
        const portraitX =
          this.scale.gameSize.width - portraitOffsetX + j * portraitSpace;

        const healthBar = new StatusBar(
          this,
          StatusBarTypes.health,
          portraitX - 132,
          portraitY - 160,
          196,
          20
        );

        const healthText = this.add.text(
          portraitX - 160,
          portraitY - 168,
          "32",
          {
            font: "24px Oswald",
            color: "#4b3d44",
          }
        );

        const manaBar = new StatusBar(
          this,
          StatusBarTypes.mana,
          portraitX - 132,
          portraitY - 130,
          196,
          20
        );

        const manaText = this.add.text(portraitX - 160, portraitY - 138, "26", {
          font: "24px Oswald",
          color: "#4b3d44",
        });

        const staminaBar = new StatusBar(
          this,
          StatusBarTypes.stamina,
          portraitX - 132,
          portraitY - 100,
          196,
          20
        );

        const staminaText = this.add.text(
          portraitX - 160,
          portraitY - 108,
          "15",
          {
            font: "24px Oswald",
            color: "#4b3d44",
          }
        );

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

        let count = 0;

        attackButton.on("pointerup", () => {
          this.handleCreateFloatMenu(
            count,
            portraitX + i * 155 - 128,
            portraitY + 32
          );
          count++;
        });
      });
    });
  }

  handleCreateFloatMenu = (key: number, x: number, y: number): void => {
    const floatMenu = this.add.zone(x - 150, y - 100, 300, 200);

    floatMenu.setInteractive();
    floatMenu.setOrigin(0);

    const floatMenuScene = new FloatMenuScene(key, floatMenu);

    this.scene.add(`FloatMenuScene${key}`, floatMenuScene);
    floatMenuScene.scene.start();
  };
}

export default BattleUIScene;
