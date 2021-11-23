// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CompareString = (string1: string, string2: string) => {
  return string1.localeCompare(string2, 'en', {
    numeric: true,
  });
};

export default CompareString;
