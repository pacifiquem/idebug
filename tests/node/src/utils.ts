import { IDebug } from '@idebug/node';

function randomNumberGen(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

export default IDebug.logFunction(randomNumberGen);
