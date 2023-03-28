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
      ["portrait1", "portrait3"],
      ["portrait3", "emptyPortrait"],
    ];

    portraits.forEach((row: string[], i: number): void => {
      const portraitY = portraitOffsetY + i * portraitSpace;

      row.forEach((portrait: string, j: number) => {
        const portraitX =
          this.scale.gameSize.width - portraitOffsetX + j * portraitSpace;

        const healthBar = new StatusBar(
          this,
          StatusBarTypes.health,
          portraitX - 158,
          portraitY - 166,
          218,
          28
        );

        const healthTextBackground = this.add.image(
          portraitX - 192,
          portraitY - 168,
          "uiStatisticsBackground"
        );

        healthTextBackground.setOrigin(0);

        const healthText = this.add.text(
          portraitX - 188,
          portraitY - 168,
          "23",
          {
            font: "24px Oswald",
            color: "#4b3d44",
          }
        );

        const manaBar = new StatusBar(
          this,
          StatusBarTypes.mana,
          portraitX - 158,
          portraitY - 132,
          218,
          28
        );

        const manaTextBackground = this.add.image(
          portraitX - 192,
          portraitY - 134,
          "uiStatisticsBackground"
        );

        manaTextBackground.setOrigin(0);

        const manaText = this.add.text(portraitX - 188, portraitY - 134, "36", {
          font: "24px Oswald",
          color: "#4b3d44",
        });

        const timeUnitsBar = new StatusBar(
          this,
          StatusBarTypes.timeUnit,
          portraitX - 158,
          portraitY - 98,
          218,
          28
        );

        const timeUnitsTextBackground = this.add.image(
          portraitX - 192,
          portraitY - 100,
          "uiStatisticsBackground"
        );

        timeUnitsTextBackground.setOrigin(0);

        const timeUnitsText = this.add.text(
          portraitX - 188,
          portraitY - 100,
          "35",
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
          portrait === "emptyPortrait"
        );

        const potionButton = new Button(
          this,
          portraitX - 164,
          portraitY - 32,
          "potion",
          () => {},
          portrait === "emptyPortrait"
        );

        const castButton = new Button(
          this,
          portraitX - 100,
          portraitY + 32,
          "cast",
          () => {},
          portrait === "emptyPortrait"
        );

        const actionButton = new Button(
          this,
          portraitX - 164,
          portraitY + 32,
          "flag",
          () => {},
          portrait === "emptyPortrait"
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
