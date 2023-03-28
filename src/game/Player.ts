import eventHandler from "../contants/eventHandler";
import mapSize from "../contants/mapSize";
import Directions from "../enums/Directions";
import world from "../contants/world";
import { WorldMap } from "./map/WorldGenerator";
import MapTileTypes from "../enums/MapTileTypes";
import { CommentaryEvents } from "./CommentaryManager";
import MapTile from "./MapTile";

interface Position {
  x: number;
  y: number;
}

type BattleState = "attackPhase" | "blockPhase";

class Player {
  private _position: Position = { x: 0, y: 0 };
  private _direction: number;
  private _isInBattle: boolean;
  private _currentLevel: number;
  private _worldMap: WorldMap;
  private _health: number;
  private _currentHealth: number;
  private _mana: number;
  private _currentMana: number;
  private _movement: number;
  private _currentMovement: number;
  private _timeUnit: number;
  private _currentTimeUnit: number;
  private _battleState?: BattleState;

  constructor() {
    this._position.x = 4;
    this._position.y = 4;
    this._direction = Directions.north;
    this._isInBattle = false;
    this._currentLevel = 1;
    this._health = 0;
    this._currentHealth = this._health;
    this._mana = 0;
    this._currentMana = this._mana;
    this._movement = 0;
    this._currentMovement = this._movement;
    this._timeUnit = 0;
    this._currentTimeUnit = this._timeUnit;
    this._worldMap = this.findWorldMap();
  }

  public addToGame = (scene: Phaser.Scene): void => {
    eventHandler.on("up", this.handleUp, scene);
    eventHandler.on("down", this.handleDown, scene);
    eventHandler.on("right", this.handleRight, scene);
    eventHandler.on("left", this.handleLeft, scene);
  };

  public set positionX(x: number) {
    this._position.x = x;
  }

  public set positionY(y: number) {
    this._position.y = y;
  }

  public set position(position: Position) {
    this._position = position;
  }

  public set direction(direction: number) {
    this._direction = direction;
  }

  public get positionX(): number {
    return this._position.x;
  }

  public get positionY(): number {
    return this._position.y;
  }

  public get direction(): number {
    return this._direction;
  }

  public get isInBattle(): boolean {
    return this._isInBattle;
  }

  public set isInBattle(isInBattle: boolean) {
    this._isInBattle = isInBattle;
  }

  public get battleState(): BattleState | undefined {
    return this._battleState;
  }

  public set battleState(battleState: BattleState | undefined) {
    this._battleState = battleState;
  }

  public get currentLevel(): number {
    return this._currentLevel;
  }

  public get currentMap(): MapTile[][] {
    const worldMap = world.worldMaps.find(
      (worldMap): boolean => worldMap.level === this.currentLevel
    );

    return worldMap?.map || [];
  }

  private handleUp = (): void => {
    if (this._position.y > 0) {
      if (
        this._worldMap.map[this._position.y - 1][this._position.x].type !==
        MapTileTypes.mountain
      ) {
        this._position.y--;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this._direction = Directions.north;

      eventHandler.emit("moveForward");
    }
  };

  private handleDown = (): void => {
    if (this._position.y < mapSize.height - 1) {
      if (
        this._worldMap.map[this._position.y + 1][this._position.x].type !==
        MapTileTypes.mountain
      ) {
        this._position.y++;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this._direction = Directions.south;

      eventHandler.emit("moveBack");
    }
  };

  private handleRight = (): void => {
    if (this._position.x < mapSize.width - 1) {
      if (
        this._worldMap.map[this._position.y][this._position.x + 1].type !==
        MapTileTypes.mountain
      ) {
        this._position.x++;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this._direction = Directions.east;

      eventHandler.emit("moveRight");
    }
  };

  private handleLeft = (): void => {
    if (this._position.x > 0) {
      if (
        this._worldMap.map[this._position.y][this._position.x - 1].type !==
        MapTileTypes.mountain
      ) {
        this._position.x--;
      } else {
        eventHandler.emit("showCommentary", CommentaryEvents.mountainBlock);
      }

      this._direction = Directions.west;

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
