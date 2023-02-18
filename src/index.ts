import Phaser from "phaser";
import config from "./config";
import BattleScene from "./scenes/BattleScene";
import GameScene from "./scenes/GameScene";
import MainScene from "./scenes/MainScene";
import MenuScene from "./scenes/MenuScene";

new Phaser.Game(
  Object.assign(config, {
    scene: [MainScene, MenuScene, GameScene, BattleScene],
  })
);
