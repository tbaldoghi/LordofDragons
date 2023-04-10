import StatisticsTypes from "../enums/StatisticsTypes";

type StatisticsType =
  | StatisticsTypes.player
  | StatisticsTypes.mercenary
  | StatisticsTypes.wolf
  | StatisticsTypes.skeleton;

interface Statistics {
  name: StatisticsType;
  minimumHealth: number;
  maximumHealth: number;
  minimumMana: number;
  maximumMana: number;
  movement: number;
  minimumTimeUnit: number;
  maximumTimeUnit: number;
}

const statisticsDataTable: Statistics[] = [
  {
    name: StatisticsTypes.player,
    minimumHealth: 50,
    maximumHealth: 60,
    minimumMana: 40,
    maximumMana: 40,
    movement: 32,
    minimumTimeUnit: 50,
    maximumTimeUnit: 60,
  },
  {
    name: StatisticsTypes.mercenary,
    minimumHealth: 50,
    maximumHealth: 60,
    minimumMana: 40,
    maximumMana: 40,
    movement: 32,
    minimumTimeUnit: 50,
    maximumTimeUnit: 60,
  },
];

const getStatistics = (type: StatisticsTypes): Statistics | undefined => {
  return statisticsDataTable.find(
    (statistics: Statistics) => statistics.name === type
  );
};

export default getStatistics;
