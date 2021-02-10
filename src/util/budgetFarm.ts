import { IRowPayload } from '../store/budget/budget.type';
import { getInterest } from './getInterest';

export const getBudgetByFarm = (defaultData: any): IRowPayload[] => {
  let counter = 1;
  const rows: IRowPayload[] = [
    {
      name: 'Harvest',
      key: '1',
    },
  ];

  const totalValues = {
    length: 0,
    length_actual: 0,
    harvestTonnes: 0,
    harvestTonnes_actual: 0,
    harvestIncome: 0,
    harvestIncome_actual: 0,
    maintenance: 0,
    maintenance_actual: 0,
    seed: 0,
    seed_actual: 0,
  };

  defaultData?.lines?.map((line: any) => {
    if (line?.line_budget?.length) {
      totalValues.length += Number(line?.line_budget[0]?.length_budget);
      totalValues.length_actual += Number(line?.line_budget[0]?.length_actual);
      totalValues.harvestTonnes += Number(
        line?.line_budget[0]?.planned_harvest_tones,
      );
      totalValues.harvestTonnes_actual += Number(
        line?.line_budget[0]?.planned_harvest_tones_actual,
      );
      totalValues.harvestIncome += Number(
        line?.line_budget[0]?.budgeted_harvest_income,
      );
      totalValues.harvestIncome_actual += Number(
        line?.line_budget[0]?.budgeted_harvest_income_actual,
      );

      line?.line_budget[0]?.expenses.map((expense: any) => {
        if (expense?.type === 's') {
          totalValues.seed += Number(expense?.price_budget);
          totalValues.seed_actual += Number(expense?.price_actual);
        }
        if (expense?.type === 'm') {
          totalValues.maintenance += Number(expense?.price_budget);
          totalValues.maintenance_actual += Number(expense?.price_actual);
        }

        return null;
      });
    }
    return null;
  });

  counter += 1;
  const length = getInterest(totalValues.length_actual, totalValues.length);
  rows.push({
    name: 'Length',
    budgeted: totalValues.length.toString(),
    actual: totalValues.length_actual.toString(),
    var: {
      ...length,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  const harvestTonnes = getInterest(
    totalValues.harvestTonnes_actual,
    totalValues.harvestTonnes,
  );
  counter += 1;
  rows.push({
    name: 'Harvest tonnes',
    budgeted: totalValues.harvestTonnes.toString(),
    actual: totalValues.harvestTonnes_actual.toString(),
    var: {
      ...harvestTonnes,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  counter += 1;
  rows.push({
    name: 'Income',
    key: counter.toString(),
  });

  const harvestIncome = getInterest(
    totalValues.harvestIncome_actual,
    totalValues.harvestIncome,
  );

  counter += 1;
  rows.push({
    name: 'Harvest income',
    budgeted: totalValues.harvestIncome.toString(),
    actual: totalValues.harvestIncome_actual.toString(),
    var: {
      ...harvestIncome,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  counter += 1;
  const profit_budgeted =
    totalValues.harvestIncome - (totalValues.seed + totalValues.maintenance);
  const profit_actual =
    totalValues.harvestIncome_actual -
    (totalValues.seed_actual + totalValues.maintenance_actual);
  const interestProfit = getInterest(profit_actual, profit_budgeted);

  rows.push({
    name: 'Profit',
    budgeted:
      profit_budgeted % 1 === 0
        ? profit_budgeted.toString()
        : profit_budgeted.toFixed(2),
    actual:
      profit_actual % 1 === 0
        ? profit_actual.toString()
        : profit_actual.toFixed(2),
    var: {
      ...interestProfit,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  counter += 1;
  rows.push({
    name: 'Expenses',
    key: counter.toString(),
  });

  const seed = getInterest(totalValues.seed_actual, totalValues.seed);

  counter += 1;
  rows.push({
    name: 'Seeding cost',
    budgeted: totalValues.seed.toString(),
    actual: totalValues.seed_actual.toString(),
    var: {
      ...seed,
      isReverse: true,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  const maintenance = getInterest(
    totalValues.maintenance_actual,
    totalValues.maintenance,
  );

  counter += 1;
  rows.push({
    name: 'Maintenance cost',
    budgeted: totalValues.maintenance.toString(),
    actual: totalValues.maintenance_actual.toString(),
    var: {
      ...maintenance,
      isReverse: true,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  const total = getInterest(
    totalValues.maintenance_actual + totalValues.seed_actual,
    totalValues.maintenance + totalValues.seed,
  );

  counter += 1;
  rows.push({
    name: 'Total expenses',
    budgeted: (totalValues.maintenance + totalValues.seed).toString(),
    actual: (
      totalValues.maintenance_actual + totalValues.seed_actual
    ).toString(),
    var: {
      ...total,
      isReverse: true,
    },
    key: counter.toString(),
    budget_id: defaultData?.lines[0]?.line_budget[0]?.budget_id,
  });

  return rows;
};
