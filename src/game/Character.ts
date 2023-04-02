import Inventory from "./Inventory";

abstract class Character {
  protected _health!: number;
  protected _currentHealth!: number;
  protected _mana!: number;
  protected _currentMana!: number;
  protected _movement!: number;
  protected _currentMovement!: number;
  protected _timeUnit!: number;
  protected _currentTimeUnit!: number;
  protected _inventory: Inventory;

  constructor() {
    this._inventory = new Inventory();
  }

  public get health(): number {
    return this._health;
  }

  public set health(health: number) {
    this._health = health;
  }

  public get currentHealth(): number {
    return this._currentHealth;
  }

  public set currentHealth(currentHealth: number) {
    this._currentHealth = currentHealth;
  }

  public get mana(): number {
    return this._mana;
  }

  public set mana(mana: number) {
    this._mana = mana;
  }

  public get currentMana(): number {
    return this._currentMana;
  }

  public set currentMana(currentMana: number) {
    this._currentMana = currentMana;
  }

  public get movement(): number {
    return this._movement;
  }

  public set movement(movement: number) {
    this._movement = movement;
  }

  public get currentMovement(): number {
    return this._currentMovement;
  }

  public set currentMovement(currentMovement: number) {
    this._currentMovement = currentMovement;
  }

  public get timeUnit(): number {
    return this._timeUnit;
  }

  public set timeUnit(timeUnit: number) {
    this._timeUnit = timeUnit;
  }

  public get currentTimeUnit(): number {
    return this._currentTimeUnit;
  }

  public set currentTimeUnit(currentTimeUnit: number) {
    this._currentTimeUnit = currentTimeUnit;
  }

  public get inventory(): Inventory {
    return this._inventory;
  }
}

export default Character;
