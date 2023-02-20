import MessageArea from "../game/MessageArea";
import TextButton from "../ui/common/TextButton";

class FloatMenuScene extends Phaser.Scene {
  parent: Phaser.GameObjects.Zone;
  key: number;
  x = 0;
  y = 0;
  items: string[];

  constructor(key: number, parent: Phaser.GameObjects.Zone) {
    super(`${FloatMenuScene}${key}`);

    this.parent = parent;
    this.key = key;
    this.items = ["Swift attack", "Normal attack", "Power attack"];
  }

  create(): void {
    this.cameras.main.setViewport(
      this.parent.x,
      this.parent.y,
      210,
      this.items.length * 36
    );

    this.cameras.main.setBackgroundColor("rgba(209, 177, 135, 0.9)");

    const border = this.add.rectangle(0, 0, 210, this.items.length * 36);
    border.setOrigin(0);
    border.setStrokeStyle(4, 0x574852);

    this.items.forEach((item: string, index: number) => {
      const button = new TextButton(
        this,
        20,
        0 + 34 * index,
        item,
        () => {},
        28
      );
    });

    this.events.on(
      "closeFloatMenu",
      () => {
        this.parent.x, this.parent.y, 210, this.items.length * 36;

        if (
          this.x < this.parent.x ||
          this.x > this.parent.x + 210 ||
          this.y < this.parent.y ||
          this.y > this.parent.y + this.items.length * 36
        ) {
          this.scene.remove(`${FloatMenuScene}${this.key}`);
          this.parent.destroy();
        }
      },
      this
    );
  }

  refresh(): void {
    this.cameras.main.setPosition(this.parent.x, this.parent.y);
    this.scene.bringToTop();
  }

  update(time: number, delta: number): void {
    this.x = this.input.mousePointer.position.x;
    this.y = this.input.mousePointer.position.y;

    if (this.input.mousePointer.isDown) {
      this.events.emit("closeFloatMenu");
    }
  }
}

export default FloatMenuScene;
