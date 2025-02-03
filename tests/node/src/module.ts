import { IDebug } from '@idebug/node';

type fn = (a: number, b: number) => number;

const sub: fn = (a, b) => {
  return a - b;
};

const add: fn = (a, b) => {
  return a + b;
};

const multiply: fn = (a, b) => {
  return a * b;
};

const divide: fn = (a, b) => {
  return b !== 0 ? a / b : NaN;
};

const loggedModule = IDebug.logModule(
  { add, sub, divide, multiply },
  'Calculator consts',
);

export default loggedModule;
