import dialogs from "../contants/dialogs";
import eventHandler from "../contants/eventHandler";
import player from "../contants/player";
import BattleStates from "../enums/BattleStates";
import Creatures from "../enums/Creatures";
import MapTileEvents from "../enums/MapTileEvents";
import MapTileTypes from "../enums/MapTileTypes";
import BattleUIScene from "../scenes/BattleUIScene";
import DialogScene from "../scenes/DialogScene";
import Dialog from "./Dialog";
import MapTile from "./MapTile";

class DialogManager {
  private _mapTile!: MapTile;

  public addMapDialogs(scene: Phaser.Scene): void {
    const { currentMap } = player;
    this._mapTile = currentMap[player.positionY][player.positionX];

    this.dialogForEmptyTile();
    this.dialogForCreatureTile(scene);
  }

  private dialogForEmptyTile(): void {
    if (player.isInBattle) {
      return;
    }

    if (this._mapTile.event !== MapTileEvents.empty) {
      return;
    }

    const tileType = this._mapTile.type;

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

    if (this._mapTile.event !== MapTileEvents.creature) {
      return;
    }

    const creatureType = this._mapTile.getCreatureType();

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

    if (player.battleState === BattleStates.attackPhase) {
      dialogs.push(new Dialog("Attack phase."));
    }

    if (player.battleState === BattleStates.blockPhase) {
      dialogs.push(new Dialog("Block phase."));
    }

    dialogs.push(new Dialog("...Next phase", true, this.handleNextPhaseClick));
    dialogs.push(new Dialog(""));
    dialogs.push(new Dialog(""));
    dialogs.push(new Dialog(""));
    dialogs.push(new Dialog(""));
    dialogs.push(new Dialog("...Retrait", true, () => {}));
  }

  private handleAttackClick(scene: Phaser.Scene): void {
    player.isInBattle = true;
    player.battleState = BattleStates.attackPhase;

    scene.scene.stop("GameUIScene");
    scene.scene.stop("MiniMapScene");
    scene.scene.launch("BattleUIScene", BattleUIScene);
    eventHandler.emit("battle");
  }

  private handleNextPhaseClick = () => {
    if (player.battleState === BattleStates.attackPhase) {
      player.battleState = BattleStates.blockPhase;
    } else if (player.battleState === BattleStates.blockPhase) {
      player.battleState = BattleStates.attackPhase;
    }
    eventHandler.emit("battle");
  };
}

export default DialogManager;
