import Items from "../enums/Items";
import ItemInterface from "../interfaces/ItemInterface";
import Item from "./Item";

class Weapon extends Item implements ItemInterface {
  public readonly type: string = Items.weapon;
}

export default Weapon;
