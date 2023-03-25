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

class Player {
  private _position: Position = { x: 0, y: 0 };
  private _direction: number;
  private _currentLevel: number;
  private _worldMap: WorldMap;
  private _health: number;
  private _mana: number;
  private _movement: number;

  constructor() {
    this._position.x = 4;
    this._position.y = 4;
    this._direction = Directions.north;
    this._currentLevel = 1;
    this._health = 0;
    this._mana = 0;
    this._movement = 0;
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
