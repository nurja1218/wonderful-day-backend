export const isTruthy = (...checkFor: any) => {
  if (Array.isArray(checkFor)) {
    return checkFor.every((item) => !!item);
  }
  return !!checkFor;
};

export const isFalsy = (...checkFor: any) => {
  if (Array.isArray(checkFor)) {
    return checkFor.every((item) => !item);
  }
  return !checkFor;
};

export const includes = (value: any, searchValues: any[]) => {
  return searchValues.includes(value);
};

export const ternary = <T>(
  comparison: boolean,
  truthyObject: T,
  falsyObject: T,
): T => (comparison ? truthyObject : falsyObject);
