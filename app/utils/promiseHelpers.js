export function transformSymbolname(symbolName) {
  return {
    pending: `${symbolName}_PENDING`,
    fulfilled: `${symbolName}_FULFILLED`,
    rejected: `${symbolName}_REJECTED`,
    $symbol: symbolName,
  };
}

export function getPendingSymbols(constants, ...args) {
  let transformKeys;
  if (!args.length) { // get all symbols
    transformKeys = Object.keys(constants);
  } else if (args.length === 1) { // [['foo', 'bar']]
    transformKeys = args[0];
  } else { // ['foo', 'bar']
    transformKeys = args;
  }
  return Object.keys(constants).reduce((acc, key) => {
    const value = transformKeys.indexOf(key) > -1 ? transformSymbolname(constants[key]) : constants[key];
    return { ...acc, [key]: value };
  }, {});
}
