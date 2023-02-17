import Phaser from "phaser";
import GameScene from "./GameScene";
import CommonButton from "../ui/common/CommonButton";

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
    const newGameButton = new CommonButton(
      this,
      200,
      300,
      "fullScreen",
      this.handleNewGameClick
    );
    const fullScreenButton = new CommonButton(
      this,
      200,
      500,
      "fullScreen",
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
