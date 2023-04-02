import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import { WeaponData } from "../contants/weaponDataTable";
import Events from "../enums/Events";
import StatusBarTypes from "../enums/StatusBarTypes";
import Mercenary from "../game/Mercenary";
import Player from "../game/Player";
import Button from "../ui/common/Button";
import StatusBar from "../ui/common/StatusBar";
import TextButton from "../ui/common/TextButton";
import FloatMenuScene, { FloatMenuItem } from "./FloatMenuScene";

class BattleUIScene extends Phaser.Scene {
  #healthBars: StatusBar[] = [];
  #manaBars: StatusBar[] = [];
  #timeUnitBars: StatusBar[] = [];
  #healthTexts: Phaser.GameObjects.Text[] = [];
  #manaTexts: Phaser.GameObjects.Text[] = [];
  #timeUnitTexts: Phaser.GameObjects.Text[] = [];
  #characters: (Player | Mercenary)[] = [];
  #buttons: Button[] = [];

  constructor() {
    super("BattleUIScene");

    this.#characters = [player, ...player.mercenaries];
  }

  create(): void {
    const uiRightBattleBack = this.add.image(1288, 0, "uiRightBattleBack");

    uiRightBattleBack.setOrigin(0);

    const portraitSpace = 300;
    const portraitOffsetX = 400;
    const portraitOffsetY = 200;
    let index = 0;

    for (let i = 0; i < 2; i++) {
      const portraitY = portraitOffsetY + i * portraitSpace;

      for (let j = 0; j < 2; j++) {
        const portraitX =
          this.scale.gameSize.width - portraitOffsetX + j * portraitSpace;

        if (index < this.#characters.length) {
          const {
            portrait,
            currentHealth,
            health,
            currentMana,
            mana,
            currentTimeUnit,
            timeUnit,
          } = this.#characters[index];

          this.#healthBars.push(
            new StatusBar(
              this,
              StatusBarTypes.health,
              portraitX - 158,
              portraitY - 166,
              218,
              28
            )
          );
          this.#healthBars[index].calculateCurrentValue(currentHealth, health);

          const healthTextBackground = this.add.image(
            portraitX - 192,
            portraitY - 168,
            "uiStatisticsBackground"
          );

          healthTextBackground.setOrigin(0);

          this.#healthTexts.push(
            this.add.text(
              portraitX - 188,
              portraitY - 168,
              `${currentHealth}`,
              {
                font: "24px Oswald",
                color: "#4b3d44",
              }
            )
          );

          this.#manaBars.push(
            new StatusBar(
              this,
              StatusBarTypes.mana,
              portraitX - 158,
              portraitY - 132,
              218,
              28
            )
          );
          this.#manaBars[index].calculateCurrentValue(currentMana, mana);

          const manaTextBackground = this.add.image(
            portraitX - 192,
            portraitY - 134,
            "uiStatisticsBackground"
          );

          manaTextBackground.setOrigin(0);

          this.#manaTexts.push(
            this.add.text(portraitX - 188, portraitY - 134, `${currentMana}`, {
              font: "24px Oswald",
              color: "#4b3d44",
            })
          );

          this.#timeUnitBars.push(
            new StatusBar(
              this,
              StatusBarTypes.timeUnit,
              portraitX - 158,
              portraitY - 98,
              218,
              28
            )
          );
          this.#timeUnitBars[index].calculateCurrentValue(
            currentTimeUnit,
            timeUnit
          );

          const timeUnitsTextBackground = this.add.image(
            portraitX - 192,
            portraitY - 100,
            "uiStatisticsBackground"
          );

          timeUnitsTextBackground.setOrigin(0);

          this.#timeUnitTexts.push(
            this.add.text(
              portraitX - 188,
              portraitY - 100,
              `${currentTimeUnit}`,
              {
                font: "24px Oswald",
                color: "#4b3d44",
              }
            )
          );

          this.add.image(portraitX, portraitY, portrait);

          const attackButton = new Button(
            this,
            portraitX - 100,
            portraitY - 32,
            "attack",
            () => {}
          );

          this.#buttons.push(attackButton);

          const potionButton = new Button(
            this,
            portraitX - 164,
            portraitY - 32,
            "potion",
            () => {}
          );

          this.#buttons.push(potionButton);

          const castButton = new Button(
            this,
            portraitX - 100,
            portraitY + 32,
            "cast",
            () => {}
          );

          this.#buttons.push(castButton);

          const actionButton = new Button(
            this,
            portraitX - 164,
            portraitY + 32,
            "flag",
            () => {}
          );

          this.#buttons.push(actionButton);

          let count = 0;

          attackButton.on("pointerup", () => {
            this.handleCreateFloatMenu(
              count,
              portraitX + i * 155 - 128,
              portraitY + 32
            );
            console.log("clicked");
            count++;
          });
        } else {
          this.add.image(portraitX, portraitY, "emptyPortrait");

          const attackButton = new Button(
            this,
            portraitX - 100,
            portraitY - 32,
            "attack",
            () => {},
            true
          );

          const potionButton = new Button(
            this,
            portraitX - 164,
            portraitY - 32,
            "potion",
            () => {},
            true
          );

          const castButton = new Button(
            this,
            portraitX - 100,
            portraitY + 32,
            "cast",
            () => {},
            true
          );

          const actionButton = new Button(
            this,
            portraitX - 164,
            portraitY + 32,
            "flag",
            () => {},
            true
          );
        }

        index++;
      }
    }

    eventHandler.on(Events.closeAfterClick, this.handleCloseFloatMenu);
  }

  private handleCreateFloatMenu = (key: number, x: number, y: number): void => {
    const floatMenu = this.add.zone(x - 150, y - 100, 250, 200);

    floatMenu.setInteractive();
    floatMenu.setOrigin(0);

    // TODO: Remove map.
    const floatMenuScene = new FloatMenuScene(
      key,
      floatMenu,
      player.inventory.weaponAttacks().map(
        (weaponAttack: WeaponData): FloatMenuItem => ({
          text: `${weaponAttack.name} (${Math.floor(
            player.timeUnit * weaponAttack.timeUnit
          )} TU)`,
          onClick: () => {
            eventHandler.emit(Events.battleAttack);
          },
        })
      )
    );

    this.#buttons.forEach((button: Button): void => {
      button.disable();
    });

    this.scene.add(`FloatMenuScene${key}`, floatMenuScene);
    floatMenuScene.scene.start();
  };

  public handleCloseFloatMenu = (): void => {
    this.#buttons.forEach((button: Button): void => {
      button.enable();
    });
  };

  private redrawStatusBars = (): void => {
    this.#characters.forEach(
      (character: Player | Mercenary, index: number): void => {
        const {
          currentHealth,
          health,
          currentMana,
          mana,
          currentTimeUnit,
          timeUnit,
        } = character;

        this.#healthBars[index].calculateCurrentValue(currentHealth, health);
        this.#manaBars[index].calculateCurrentValue(currentMana, mana);
        this.#timeUnitBars[index].calculateCurrentValue(
          currentTimeUnit,
          timeUnit
        );
        this.#healthTexts[index].text = `${currentHealth}`;
        this.#manaTexts[index].text = `${currentMana}`;
        this.#timeUnitTexts[index].text = `${currentTimeUnit}`;
      }
    );
  };
}

export default BattleUIScene;
