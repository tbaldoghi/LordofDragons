import eventHandler from "../contants/eventHandler";
import mapSize from "../contants/mapSize";
import Directions from "../enums/Directions";

interface Position {
  x: number;
  y: number;
}

class Player {
  private _position: Position = { x: 0, y: 0 };
  private _direction: number;

  constructor() {
    this._position.x = mapSize.width / 2;
    this._position.y = mapSize.height / 2;
    this._direction = Directions.north;
  }

  public addToGame = (scene: Phaser.Scene): void => {
    eventHandler.on("turnRight", this.handleTurnRight, scene);
    eventHandler.on("turnLeft", this.handleTurnLeft, scene);
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

  public get direction(): number {
    return this._direction;
  }

  private handleTurnRight = (): void => {
    if (this._direction < Directions.west) {
      this._direction++;
    } else {
      this._direction = 0;
    }
  };

  private handleTurnLeft = (): void => {
    if (this._direction > Directions.north) {
      this.direction--;
    } else {
      this.direction = 3;
    }
  };

  private handleUp = (): void => {
    if (this._position.y < mapSize.height) {
      this._position.y++;
    }
  };

  private handleDown = (): void => {
    if (this._position.y > 0) {
      this._position.y--;
    }
  };

  private handleRight = (): void => {
    if (this._position.x < Directions.east) {
      this._position.x++;
    }
  };

  private handleLeft = (): void => {
    if (this._position.x > 0) {
      this._position.x--;
    }
  };
}

export default Player;
