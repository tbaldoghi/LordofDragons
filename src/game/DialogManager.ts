import dialogs from "../contants/dialogs";
import player from "../contants/player";
import Creatures from "../enums/Creatures";
import MapTileEvents from "../enums/MapTileEvents";
import BattleUIScene from "../scenes/BattleUIScene";
import DialogScene from "../scenes/DialogScene";
import Dialog from "./Dialog";
import MapTile from "./MapTile";

class DialogManager {
  private _mapTile: MapTile;

  constructor() {
    const { currentMap } = player;
    this._mapTile = currentMap[player.positionY][player.positionX];
  }

  public addDialogs(scene: Phaser.Scene): void {
    this.dialogForCreatureTile(scene);
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

  private handleAttackClick(scene: Phaser.Scene): void {
    player.isInBattle = true;

    scene.scene.stop("GameUIScene");
    scene.scene.stop("MiniMapScene");
    scene.scene.start("BattleUIScene", BattleUIScene);
    scene.scene.start("DialogScene", DialogScene); // TODO
  }
}

export default DialogManager;
