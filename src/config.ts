import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#000000",
  pixelArt: true,
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
