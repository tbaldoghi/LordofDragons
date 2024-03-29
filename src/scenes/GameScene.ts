import Phaser from "phaser";
import creatures from "../contants/creatures";
import player from "../contants/player";
import ViewSize from "../enums/ViewSize";
import BattleUIScene from "./BattleUIScene";
import DialogScene from "./DialogScene";
import GameUIScene from "./GameUIScene";
import ViewScene from "./ViewScene";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload(): void {
    const path = "assets/images";

    this.load.image("uiBackground", `${path}/ui/background.png`);
    this.load.image("uiMapBorder", `${path}/ui/map_border.png`);
    this.load.image("uiRightBack", `${path}/ui/right_back.png`);
    this.load.image("uiRightBattleBack", `${path}/ui/right_battle_back.png`);
    this.load.image("uiSelect", `${path}/ui/select.png`);
    this.load.image("messageBackground", `${path}/ui/message_background.png`);
    this.load.image("emptyPortrait", `${path}/ui/empty_portrait.png`);
    this.load.image("minimapArrow", `${path}/ui/minimap_arrow.png`);
    this.load.image("minimapMark", `${path}/ui/minimap_mark.png`);
    this.load.image("minimapLoot", `${path}/ui/minimap_gold.png`);
    this.load.image("minimapLocation", `${path}/ui/minimap_location.png`);
    this.load.image("uiDateBackground", `${path}/ui/date_background.png`);
    this.load.image(
      "uiStatisticsBackground",
      `${path}/ui/statistics_background.png`
    );
    this.load.spritesheet("nextTurn", `${path}/ui/next_turn.png`, {
      frameWidth: 78,
      frameHeight: 78,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("menu", `${path}/ui/menu.png`, {
      frameWidth: 78,
      frameHeight: 78,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("fullScreen", `${path}/ui/full_screen.png`, {
      frameWidth: 78,
      frameHeight: 78,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("mapTiles", `${path}/ui/map_tiles.png`, {
      frameWidth: 32,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 12,
    });
    this.load.spritesheet("inventory", `${path}/ui/inventory_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("cast", `${path}/ui/cast_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("flag", `${path}/ui/flag_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.spritesheet("book", `${path}/ui/book_button.png`, {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 1,
    });
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
    this.load.image("forest", `${path}/background/forest/forest.png`);
    this.load.image("portrait1", `${path}/portraits/portrait_1.png`);
    this.load.image("portrait3", `${path}/portraits/portrait_3.png`);
    this.load.image("portrait3dead", `${path}/portraits/portrait_3_dead.png`);

    this.loadCreatures(path);
    this.loadArrowButtons(path);
  }

  create(): void {
    const viewSceneZone = this.add.zone(0, 0, ViewSize.width, ViewSize.height);

    viewSceneZone.setOrigin(0);

    const viewScene = new ViewScene(viewSceneZone);

    this.scene.add("ViewScene", viewScene);
    viewScene.scene.start();

    const gameUIScene = new GameUIScene();

    this.scene.add("GameUIScene", gameUIScene);
    gameUIScene.scene.start();

    const battleUIScene = new BattleUIScene();

    this.scene.add("BattleUIScene", BattleUIScene);

    const dialogScene = new DialogScene();

    this.scene.add("DialogScene", dialogScene);
    dialogScene.scene.start();

    player.addToGame(this);
  }

  private loadCreatures(path: string): void {
    creatures.forEach((creature) => {
      this.load.image(creature, `${path}/creatures/${creature}.png`);
    });
  }

  private loadArrowButtons(path: string): void {
    const buttons = [
      { name: "arrowUp", fileName: "arrow_up" },
      { name: "arrowRight", fileName: "arrow_right" },
      { name: "arrowDown", fileName: "arrow_down" },
      { name: "arrowLeft", fileName: "arrow_left" },
      { name: "arrowTurnRight", fileName: "arrow_turn_right" },
      { name: "arrowTurnLeft", fileName: "arrow_turn_left" },
    ];

    buttons.forEach((button) => {
      this.load.spritesheet(button.name, `${path}/ui/${button.fileName}.png`, {
        frameWidth: 78,
        frameHeight: 78,
        startFrame: 0,
        endFrame: 1,
      });
    });
  }
}

export default GameScene;
