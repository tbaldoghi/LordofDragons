import Phaser from "phaser";
import creatures from "../data/creatures";
import GameArea from "../game/GameArea";
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
    this.load.image("arrowUp", `${path}/ui/arrow_up.png`);
    this.load.image("arrowRight", `${path}/ui/arrow_right.png`);
    this.load.image("arrowDown", `${path}/ui/arrow_down.png`);
    this.load.image("arrowLeft", `${path}/ui/arrow_left.png`);
    this.load.image("arrowTurnRight", `${path}/ui/arrow_turn_right.png`);
    this.load.image("arrowTurnLeft", `${path}/ui/arrow_turn_left.png`);
    this.load.image("emptyPortrait", `${path}/ui/empty_portrait.png`);
    this.load.spritesheet("fullScreen", `${path}/ui/full_screen.png`, {
      frameWidth: 78,
      frameHeight: 78,
      startFrame: 0,
      endFrame: 1,
    });
    this.load.image("forest", `${path}/background/forest/forest_1.png`);
    this.load.image("portrait", `${path}/portraits/portrait_1.png`);

    this.loadCreatures(path);
  }

  create(): void {
    const uiBackground = this.add.image(0, 0, "uiBackground");
    const uiBorder = this.add.image(0, 0, "uiBorder");

    uiBackground.setOrigin(0);
    uiBorder.setOrigin(0);
    this._gameArea.init(mapSize);

    this._messageArea.addMessage("A pack of wolves.");
    this._messageArea.addMessage("... Attack them.");
    this._messageArea.addMessage("... Use Speak With Animals spell.");
    this._messageArea.addMessage("... Try to sneak through.");
    this._messageArea.showMessages();

    this._navigationArea.init();
    this._portraitArea.init();
  }

  private loadCreatures(path: string): void {
    creatures.forEach((creature) => {
      this.load.image(creature, `${path}/creatures/${creature}.png`);
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
