import eventHandler from "../contants/eventHandler";
import mapSize from "../contants/mapSize";
import Directions from "../enums/Directions";
import world from "../contants/world";
import { WorldMap } from "./map/WorldGenerator";
import MapTileTypes from "../enums/MapTileTypes";
import { CommentaryEvents } from "./CommentaryManager";
import MapTile from "./MapTile";
import Mercenary from "./Mercenary";
import { random } from "pandemonium";
import getStatistics from "../contants/statisticsDataTable";
import StatisticsTypes from "../enums/StatisticsTypes";
import Character from "./Character";

interface Position {
  x: number;
  y: number;
}

type BattleState = "attackPhase" | "blockPhase";

class Player extends Character {
  public readonly portrait: string = "portrait1";
  #position: Position = { x: 0, y: 0 };
  #direction: number;
  #isInBattle: boolean;
  #currentLevel: number;
  #worldMap: WorldMap;
  #mercenaries: Mercenary[];
  #battleState?: BattleState;

  constructor() {
    super();

    const statistics = getStatistics(StatisticsTypes.player);

    if (statistics) {
      this.health = random(statistics.minimumHealth, statistics.maximumHealth);
      this.currentHealth = this.health;
      this.mana = random(statistics.minimumMana, statistics.maximumMana);
      this.currentMana = this.mana;
      this.movement = statistics.movement;
      this.currentMovement = this.movement;
      this.timeUnit = random(
        statistics.minimumTimeUnit,
        statistics.maximumTimeUnit
      );
      this.currentTimeUnit = this.timeUnit;
    }

    this.#position.x = 4;
    this.#position.y = 4;
    this.#direction = Directions.north;
    this.#isInBattle = false;
    this.#currentLevel = 1;
    this.#mercenaries = [];
    this.#worldMap = this.findWorldMap();
  }

  public addToGame = (scene: Phaser.Scene): void => {
    eventHandler.on("up", this.handleUp, scene);
    eventHandler.on("down", this.handleDown, scene);
    eventHandler.on("right", this.handleRight, scene);
    eventHandler.on("left", this.handleLeft, scene);
  };

  public set positionX(x: number) {
    this.#position.x = x;
  }

  public set positionY(y: number) {
    this.#position.y = y;
  }

  public set position(position: Position) {
    this.#position = position;
  }

  public set direction(direction: number) {
    this.#direction = direction;
  }

  public get positionX(): number {
    return this.#position.x;
  }

  public get positionY(): number {
    return this.#position.y;
  }

  public get direction(): number {
    return this.#direction;
  }

  public get isInBattle(): boolean {
    return this.#isInBattle;
  }

  public set isInBattle(isInBattle: boolean) {
    this.#isInBattle = isInBattle;
  }

  public get battleState(): BattleState | undefined {
    return this.#battleState;
  }

  public set battleState(battleState: BattleState | undefined) {
    this.#battleState = battleState;
  }

  public get currentLevel(): number {
    return this.#currentLevel;
  }

  public get mercenaries(): Mercenary[] {
    return this.#mercenaries;
  }

  public get currentMap(): MapTile[][] {
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === this.currentLevel
    );

    return worldMap?.map || [];
  }

  private handleUp = (): void => {
    if (this.#position.y > 0) {
      if (
        this.#worldMap.map[this.#position.y - 1][this.#position.x].type !==
        MapTileTypes.mountain
      ) {
        this.#position.y--;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this.#direction = Directions.north;

      eventHandler.emit("moveForward");
    }
  };

  private handleDown = (): void => {
    if (this.#position.y < mapSize.height - 1) {
      if (
        this.#worldMap.map[this.#position.y + 1][this.#position.x].type !==
        MapTileTypes.mountain
      ) {
        this.#position.y++;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this.#direction = Directions.south;

      eventHandler.emit("moveBack");
    }
  };

  private handleRight = (): void => {
    if (this.#position.x < mapSize.width - 1) {
      if (
        this.#worldMap.map[this.#position.y][this.#position.x + 1].type !==
        MapTileTypes.mountain
      ) {
        this.#position.x++;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this.#direction = Directions.east;

      eventHandler.emit("moveRight");
    }
  };

  private handleLeft = (): void => {
    if (this.#position.x > 0) {
      if (
        this.#worldMap.map[this.#position.y][this.#position.x - 1].type !==
        MapTileTypes.mountain
      ) {
        this.#position.x--;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this.#direction = Directions.west;

      eventHandler.emit("moveLeft");
    }
  };

  private findWorldMap = (): WorldMap => {
    const worldMap = world.worldMaps.find(
      (worldMap) => worldMap.level === this.currentLevel
    );

    if (worldMap) {
      return worldMap;
    }

    return world.worldMaps[0];
  };
}

export default Player;
