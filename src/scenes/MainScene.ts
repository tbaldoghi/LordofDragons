import Phaser from "phaser";
import MenuScene from "./MenuScene";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    this.scene.start("MenuScene", MenuScene);
  }
}

export default MainScene;
