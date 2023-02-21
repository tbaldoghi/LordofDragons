import Phaser from "phaser";
import creatures from "../data/creatures";
import GameArea from "../game/GameArea";
import MapGenerator from "../game/MapGenerator";
import MessageArea from "../game/MessageArea";
import NavigationArea from "../game/NavigationArea";
import PortraitArea from "../game/PortraitArea";
import MapSize from "../interfaces/MapSize";

const mapSize: MapSize = {
  height: 40,
  width: 40,
};

class GameScene extends Phaser.Scene {
  private _gameArea: GameArea;
  private _messageArea: MessageArea;
  private _navigationArea: NavigationArea;
  private _portraitArea: PortraitArea;

  constructor() {
    super("GameScene");

    this._gameArea = new GameArea(this);
    this._messageArea = new MessageArea(this);
    this._navigationArea = new NavigationArea(this);
    this._portraitArea = new PortraitArea(this);
  }

  preload(): void {
    const path = "assets/images";

    this.load.image("uiBackground", `${path}/ui/background.png`);
    this.load.image("uiBorder", `${path}/ui/border.png`);
    this.load.image("uiRightBack", `${path}/ui/right_back.png`);
    this.load.image("uiSelect", `${path}/ui/select.png`);
    this.load.image("messageBackground", `${path}/ui/message_background.png`);
    this.load.image("emptyPortrait", `${path}/ui/empty_portrait.png`);
    this.load.spritesheet("fullScreen", `${path}/ui/full_screen.png`, {
      frameWidth: 78,
      frameHeight: 78,
      startFrame: 0,
      endFrame: 3,
    });
    this.load.spritesheet("mapTiles", `${path}/ui/map_tiles.png`, {
      frameWidth: 16,
      frameHeight: 16,
      startFrame: 0,
      endFrame: 4,
    });
    this.load.image("forest", `${path}/background/forest/forest_1.png`);
    this.load.image("portrait", `${path}/portraits/portrait_1.png`);

    this.loadCreatures(path);
    this.loadArrowButtons(path);
  }

  create(): void {
    const mapGenerator = new MapGenerator(mapSize);
    const uiBackground = this.add.image(0, 0, "uiBackground");
    const uiBorder = this.add.image(0, 0, "uiBorder");
    const uiRightBack = this.add.image(1288, 0, "uiRightBack");

    mapGenerator.init();
    uiBackground.setOrigin(0);
    uiBorder.setOrigin(0);
    uiRightBack.setOrigin(0);
    this._gameArea.init(mapSize);

    this._messageArea.addMessage("A pack of wolves.");
    this._messageArea.addMessage("... Attack them.");
    this._messageArea.addMessage("... Use Speak With Animals spell.");
    this._messageArea.addMessage("... Try to sneak through.");
    this._messageArea.showMessages();

    const map = mapGenerator.map;

    this._navigationArea.init(map);
    this._portraitArea.init();
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

  update(time: number, delta: number): void {
    const { x, y } = this.input.mousePointer.position;

    if (x > 0 && y > 0 && x < 1280 && y < 800) {
      this._gameArea.setMousePosition(x, y);
    }
  }
}

export default GameScene;
