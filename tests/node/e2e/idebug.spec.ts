import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { IDebug } from '@idebug/node';
import express, { Application } from 'express';
import { AppDebugConfig } from '../src/config';
import calModule from '../src/module';
import randomNumberGen from '../src/utils';

const app: Application = express();

IDebug.configure(AppDebugConfig);
app.use(IDebug.middleware());

app.get('/module/added', (_req, res) => {
  res.json({ data: calModule.add(1, 2) });
});

app.get('/module/subbed', (_req, res) => {
  res.json({ data: calModule.sub(1, 2) });
});

app.get('/module/multi', (_req, res) => {
  res.json({ data: calModule.multiply(1, 2) });
});

app.get('/module/divided', (_req, res, next) => {
  const result = calModule.divide(1, 0);
  if (result === Infinity || result === -Infinity) {
    next(new Error('Division by zero is not allowed'));
  }
  res.json({ data: result });
});

app.get('/func/random', (_req, res) => {
  res.json({ data: randomNumberGen(1, 2) });
});

// Test for catching errors
app.use((err: any, _req: any, res: any) => {
  res.status(500).json({ error: err.message });
});

beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  // Restore mock after all tests
  vi.restoreAllMocks();
});

describe('API Tests with IDebug', () => {
  it('should log request and response for /module/added', async () => {
    const response = await request(app).get('/module/added');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe(3);

    expect(console.log).toHaveBeenCalled();
  });

  it('should log request and response for /module/subbed', async () => {
    const response = await request(app).get('/module/subbed');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe(-1);

    expect(console.log).toHaveBeenCalled();
  });

  it('should log request and response for /module/multi', async () => {
    const response = await request(app).get('/module/multi');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe(2);

    expect(console.log).toHaveBeenCalled();
  });

  it('should log request and response for /module/divided (Division by zero)', async () => {
    const response = await request(app).get('/module/divided');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Division by zero is not allowed');

    expect(console.log).toHaveBeenCalled();
  });

  it('should log request and response for /func/random', async () => {
    const response = await request(app).get('/func/random');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeGreaterThanOrEqual(1);

    expect(console.log).toHaveBeenCalled();
  });
});

describe('logFunctionIO Test', () => {
  it('should log the input and output for randomNumberGen function', () => {
    const spyLog = vi.spyOn(console, 'log');
    const result = randomNumberGen(1, 2);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Inputs'));
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Output'));
  });
});

describe('Module Logger Test', () => {
  it('should log the input and output for calculator module functions', () => {
    const spyLog = vi.spyOn(console, 'log');

    const addResult = calModule.add(1, 2);
    expect(addResult).toBe(3);
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Inputs'));
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Output'));

    const multiplyResult = calModule.multiply(3, 2);
    expect(multiplyResult).toBe(6);
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Inputs'));
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('Output'));
  });
});
