export const detectUnits = (
    count: number,
    units: [string, string, string] | readonly [string, string, string]
): string => {
    let resultUnit: string;

    if ((count % 10 == 1 && count % 100 >= 21) || count % 100 == 1) {
        resultUnit = units[0];
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        resultUnit = units[1];
    } else {
        resultUnit = units[2];
    }

    return `${count} ${resultUnit}`;
};
