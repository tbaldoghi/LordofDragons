import eventHandler from "../contants/eventHandler";
import Events from "../enums/Events";
import TextButton from "../ui/common/TextButton";

export interface FloatMenuItem {
  text: string;
  onClick: () => void;
}

class FloatMenuScene extends Phaser.Scene {
  #parent: Phaser.GameObjects.Zone;
  #key: number;
  #x = 0;
  #y = 0;
  #items: FloatMenuItem[] = [];
  #textButtons: TextButton[] = [];

  constructor(
    key: number,
    parent: Phaser.GameObjects.Zone,
    items: FloatMenuItem[]
  ) {
    super(`${FloatMenuScene}${key}`);

    this.#parent = parent;
    this.#key = key;
    this.#items = items;
  }

  create(): void {
    this.cameras.main.setViewport(
      this.#parent.x,
      this.#parent.y,
      250,
      this.#items.length * 40
    );

    this.cameras.main.setBackgroundColor("rgba(209, 177, 135, 0.9)");

    const border = this.add.rectangle(0, 0, 250, this.#items.length * 40);

    border.setOrigin(0);
    border.setStrokeStyle(4, 0x574852);

    this.#items.forEach((item: FloatMenuItem, index: number): void => {
      this.#textButtons.push(
        new TextButton(
          this,
          20,
          34 * index,
          item.text,
          () => this.handleClick(item.onClick),
          28
        )
      );
    });

    this.events.on(
      "closeFloatMenu",
      () => {
        this.#parent.x, this.#parent.y, 210, this.#items.length * 40;

        if (
          this.#x < this.#parent.x ||
          this.#x > this.#parent.x + 210 ||
          this.#y < this.#parent.y ||
          this.#y > this.#parent.y + this.#items.length * 40
        ) {
          this.removeScene();
          eventHandler.emit(Events.closeAfterClick);
        }
      },
      this
    );
  }

  refresh(): void {
    this.cameras.main.setPosition(this.#parent.x, this.#parent.y);
    this.scene.bringToTop();
  }

  update(time: number, delta: number): void {
    this.#x = this.input.mousePointer.position.x;
    this.#y = this.input.mousePointer.position.y;

    if (this.input.mousePointer.isDown) {
      this.events.emit("closeFloatMenu");
    }
  }

  private handleClick = (onClick: () => void): void => {
    onClick();
    this.removeScene();
  };

  private removeScene = (): void => {
    this.scene.remove(`${FloatMenuScene}${this.#key}`);
    this.#parent.destroy();
  };
}

export default FloatMenuScene;
