import Phaser from "phaser";
import MenuScene from "./MenuScene";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // Workaround for the font problem.
    this.add.text(0, 0, "", {
      font: "28px Oswald",
      color: "#4b3d44",
    });
    this.scene.start("MenuScene", MenuScene);
  }
}

export default MainScene;
