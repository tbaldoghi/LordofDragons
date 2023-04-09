import BattleTurn from "../contants/BattleTurn";
import ViewCreatures, { CreatureType } from "../contants/ViewCreatures";
import dialogs from "../contants/dialogs";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
// import BattleStates from "../enums/BattleStates";
import Creatures from "../enums/Creatures";
import Events from "../enums/Events";
import MapTileEvents from "../enums/MapTileEvents";
import MapTileTypes from "../enums/MapTileTypes";
import BattleUIScene, { ListItem } from "../scenes/BattleUIScene";
import Dialog from "./Dialog";
import MapTile from "./MapTile";

class DialogManager {
  #mapTile!: MapTile;

  public addMapDialogs(scene: Phaser.Scene): void {
    const { currentMap } = player;
    this.#mapTile = currentMap[player.positionY][player.positionX];

    this.dialogForEmptyTile();
    this.dialogForCreatureTile(scene);
  }

  private dialogForEmptyTile(): void {
    if (player.isInBattle) {
      return;
    }

    if (this.#mapTile.event !== MapTileEvents.empty) {
      return;
    }

    const tileType = this.#mapTile.type;

    switch (tileType) {
      case MapTileTypes.forest:
        dialogs.push(new Dialog("Forests."));
        break;
      case MapTileTypes.hill:
        dialogs.push(new Dialog("Hills."));
        break;
      case MapTileTypes.plain:
        dialogs.push(new Dialog("Plains."));
        break;
    }
  }

  private dialogForCreatureTile(scene: Phaser.Scene): void {
    if (player.isInBattle) {
      return;
    }

    if (this.#mapTile.event !== MapTileEvents.creature) {
      return;
    }

    const creatureType = this.#mapTile.creatureType;

    switch (creatureType) {
      case Creatures.wolf:
        dialogs.push(new Dialog("A pack of wolves."));
        dialogs.push(
          new Dialog("... Attack them.", true, () =>
            this.handleAttackClick(scene)
          )
        );
        break;
      case Creatures.skeleton:
        dialogs.push(new Dialog("A few skeletons."));
        dialogs.push(
          new Dialog("... Attack them.", true, () =>
            this.handleAttackClick(scene)
          )
        );
        break;
    }
  }

  public dialogForBattle(): void {
    if (!player.isInBattle) {
      return;
    }

    dialogs.push(new Dialog(`Turn ${BattleTurn.turn}`));

    this.addEmptyDialogLines(5);

    dialogs.push(new Dialog("...Retrait", true, () => {}));
  }

  public dialogForBattleSelectAttack(listItems: ListItem[]): void {
    if (!player.isInBattle) {
      return;
    }

    dialogs.push(new Dialog("Select action!"));

    listItems.forEach((listItem: ListItem) => {
      dialogs.push(new Dialog(`... ${listItem.text}`, true, listItem.onClick));
    });

    this.addEmptyDialogLines(5 - listItems.length);

    dialogs.push(
      new Dialog("... Another action.", true, this.handleAnotherActionClick)
    );
  }

  public dialogForBattleAttack(): void {
    if (!player.isInBattle) {
      return;
    }

    dialogs.push(new Dialog("Select target!"));

    this.addEmptyDialogLines(5);

    dialogs.push(
      new Dialog("... Another action.", true, this.handleAnotherActionClick)
    );
  }

  private handleAttackClick(scene: Phaser.Scene): void {
    player.isInBattle = true;

    scene.scene.stop("GameUIScene");
    scene.scene.stop("MiniMapScene");
    scene.scene.launch("BattleUIScene", BattleUIScene);
    eventHandler.emit(Events.battle);
  }

  private handleAnotherActionClick = (): void => {
    eventHandler.emit(Events.battle);
    eventHandler.emit(Events.closeAfterClick);

    ViewCreatures.creatures.forEach((creature: CreatureType): void => {
      creature.disable();
    });
  };

  private addEmptyDialogLines = (number: number): void => {
    for (let i = 0; i < number; i++) {
      dialogs.push(new Dialog(""));
    }
  };
}

export default DialogManager;
