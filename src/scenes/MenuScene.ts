import Phaser from "phaser";
import GameScene from "./GameScene";
import Button from "../ui/common/Button";
import TextButton from "../ui/common/TextButton";

class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  public preload(): void {
    this.load.image("uiBackground", "assets/images/ui/background.png");
  }

  create(): void {
    const uiBackground = this.add.image(0, 0, "uiBackground");
    const width = this.scale.gameSize.width / 2;
    const height = this.scale.gameSize.height / 4;
    const newGameButton = new TextButton(
      this,
      250,
      300,
      "New Game",
      this.handleNewGameClick
    );
    const fullScreenButton = new TextButton(
      this,
      250,
      400,
      "Full Screen",
      this.handleFullScreenClick
    );

    uiBackground.setOrigin(0);
  }

  handleNewGameClick = (): void => {
    this.scene.start("GameScene", GameScene);
  };

  handleFullScreenClick = (): void => {
    this.scale.toggleFullscreen();
  };
}

export default MenuScene;
