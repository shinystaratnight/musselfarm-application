export const transformSeason = (data: any = []): any => {
  const utilDataWithKey = data.map((season: any, i: number) => ({
    ...season,
    key: season.id,
  }));

  return utilDataWithKey;
};
