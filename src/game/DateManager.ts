type DayType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type WeekType = 1 | 2 | 3 | 4;

enum Dates {
  startOfTheWeek = 1,
  endOfTheWeek = 7,
  startOfTheMonth = 1,
  endOfTheMonth = 4,
}

class DateManager {
  #day: DayType;
  #week: WeekType;
  #month: number;

  constructor() {
    this.#day = 1;
    this.#week = 1;
    this.#month = 1;
  }

  public get day(): DayType {
    return this.#day;
  }

  public get week(): WeekType {
    return this.#week;
  }

  public get month(): number {
    return this.#month;
  }

  public nextDay(): void {
    if (this.#day < Dates.endOfTheWeek) {
      this.#day++;
    } else {
      this.#day = Dates.startOfTheWeek;

      if (this.#week < Dates.endOfTheMonth) {
        this.#week++;
      } else {
        this.#week = Dates.startOfTheMonth;

        this.#month++;
      }
    }
  }
}

export default DateManager;
