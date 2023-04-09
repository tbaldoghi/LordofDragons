import { randomFloat } from "pandemonium";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import ViewCreatures, { CreatureType } from "../contants/ViewCreatures";
import { WeaponData } from "../contants/weaponDataTable";
import Events from "../enums/Events";
import StatusBarTypes from "../enums/StatusBarTypes";
import Mercenary from "../game/Mercenary";
import Player from "../game/Player";
import Button from "../ui/common/Button";
import StatusBar from "../ui/common/StatusBar";
import BattleTurn from "../contants/BattleTurn";

export interface ListItem {
  text: string;
  onClick: () => void;
}

class BattleUIScene extends Phaser.Scene {
  #selectedCharacter: Player | Mercenary | null;
  #timeUnitCost: number;
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

    this.#selectedCharacter = null;
    this.#timeUnitCost = 0;
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
          const character = this.#characters[index];
          const {
            portrait,
            currentHealth,
            health,
            currentMana,
            mana,
            currentTimeUnit,
            timeUnit,
            inventory,
          } = character;

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

          attackButton.on("pointerup", () =>
            this.handleAttackButtonClick(character)
          );
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

    const nextTurnButton = new Button(
      this,
      1363,
      1000,
      "nextTurn",
      this.handleNextTurnClick
    );

    eventHandler.on(
      Events.closeAfterClick,
      this.handleAnotherActionDialogClick
    ); // TODO: Rename this event.
    eventHandler.on(
      Events.battleAttack,
      () => {
        ViewCreatures.creatures.forEach((creature: CreatureType): void => {
          creature.enable();
        });
      },
      this
    );
    eventHandler.on(
      Events.battleSelectTarget,
      (creature: CreatureType): void => {
        if (this.#selectedCharacter) {
          const remainingTimeUnit =
            this.#selectedCharacter.currentTimeUnit - this.#timeUnitCost;

          if (remainingTimeUnit >= 0) {
            // TODO: Calculate hit chance.
            if (randomFloat(0, 1) > 0.6) {
              creature.hit();
            } else {
              this.missTarget(creature.x, creature.y);
            }

            this.#selectedCharacter.currentTimeUnit -= this.#timeUnitCost;
            this.redrawStatusBars();
          }
        }
      },
      this
    );
    eventHandler.on(
      Events.battleNextTurn,
      (): void => {
        this.#characters.forEach((character: Player | Mercenary): void => {
          character.battleRest();
        });

        ViewCreatures.creatures.forEach((creature: CreatureType): void => {
          creature.disable();
        });

        this.handleAnotherActionDialogClick();
        BattleTurn.nextTurn();
        this.redrawStatusBars();
      },
      this
    );
  }

  private handleAnotherActionDialogClick = (): void => {
    this.#buttons.forEach((button: Button): void => {
      button.enable();
    });
  };

  public handleAttackClick = (timeUnitCost: number): void => {
    this.#timeUnitCost = timeUnitCost;

    eventHandler.emit(Events.battleAttack);
  };

  private handleAttackButtonClick = (character: Player | Mercenary): void => {
    this.#buttons.forEach((button: Button): void => {
      button.disable();
    });

    this.#selectedCharacter = character;

    const attacks = character.inventory
      .weaponAttacks()
      .map((weaponAttack: WeaponData): ListItem => {
        const timeUnitCost = Math.floor(
          character.timeUnit * weaponAttack.timeUnit
        );

        return {
          text: `${weaponAttack.name} (${timeUnitCost} TU)`,
          onClick: () => this.handleAttackClick(timeUnitCost),
        };
      });

    eventHandler.emit(Events.battleSelectAttack, attacks);
  };

  private handleNextTurnClick = (): void => {
    eventHandler.emit(Events.battleNextTurn);
    eventHandler.emit(Events.battle);
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

  private missTarget = (x: number, y: number): void => {
    const missText = this.add.text(x, y, "Miss", {
      font: "24px Oswald",
      color: "#79444a",
      stroke: "#d2c9a5",
      strokeThickness: 4,
    });
    const tween = this.tweens.add({
      targets: missText,
      y: 400,
      paused: false,
      yoyo: false,
      repeat: 0,
      onComplete: (): void => {
        missText.destroy();
      },
    });
  };
}

export default BattleUIScene;
