import { describe, it, expect } from 'vitest';
import { Runtime as gresbRuntime } from '@gresb/cel-javascript';
import { evaluate as kevinEval } from "@kevinmichaelchen/cel-typescript-core";
import { evaluate as chromeGgEval } from 'cel-js'

async function evalGresbCEL(expr: string, vars: any = {}) {
  const runtime = new gresbRuntime(expr);
  return runtime.evaluate(vars);
}
async function evalKmcCEL(expr: string, vars: any = {}) {
  return Promise.resolve(kevinEval(expr, vars));
}
async function evalCeljs(expr: string, vars: any = {}) {
  return Promise.resolve(chromeGgEval(expr, vars));
}

const libraries = [
  { name: '@gresb/cel-javascript', evalFn: evalGresbCEL },
  { name: '@kevinmichaelchen/cel-typescript-core', evalFn: evalKmcCEL },
  { name: 'cel-js', evalFn: evalCeljs },
];

// Test cases: Each use case is an object with expression, variables, expected result, and optionally expected error substring
const testCases = [
  {
    name: 'Type checking fundamentals',
    expr: 'type(42) == int && type("text") == string',
    expected: true,
  },
  {
    name: 'Field presence check',
    expr: 'has(msg.subfield) ? msg.subfield : "default"',
    vars: { msg: {} },
    expected: 'default',
  },
  {
    name: 'List quantification',
    expr: '[1,2,3].all(x, x > 0) && [].exists(x, x < 0)',
    expected: true,
  },
  {
    name: 'Map key uniqueness check',
    expr: "{'a': 1, 'b': 2}.exists_one(k, k == 'c')",
    expected: false,
  },
  {
    name: 'String manipulation',
    expr: '"hello".contains("ell") && "FOO".lowerAscii() == "foo"',
    expected: true,
  },
  {
    name: 'Time calculations',
    expr: "timestamp('2023-01-01T00:00:00Z') + duration('1h')",
    // expected: ... (may need custom handling)
    expectError: true, // likely unsupported in some libs
  },
  {
    name: 'Quantity library functions',
    expr: 'quantity("50Mi").isLessThan(quantity("100Gi"))',
    expectError: true, // likely unsupported in some libs
  },
  {
    name: 'List aggregation',
    expr: 'items.map(x, x.weight).sum() == 1.0',
    vars: { items: [{ weight: 0.4 }, { weight: 0.6 }] },
    expected: true,
  },
  {
    name: 'List validation',
    expr: "names.isSorted() && indexOf('target') == 0",
    vars: { names: ['target', 'zzz'] },
    expected: true,
  },
  {
    name: 'Membership test',
    expr: 'x in [1, 2, 3] ? x : 0',
    vars: { x: 2 },
    expected: 2,
  },
  {
    name: 'Dynamic typing',
    expr: 'dyn(5) == 5u && dyn(3.14) > 3',
    expectError: true, // likely unsupported in some libs
  },
  {
    name: 'String interpolation',
    expr: `"id-\${uuid}".matches('^id-[a-f0-9]{8}$')`,
    vars: { uuid: 'deadbeef' },
    expected: true,
  },
  {
    name: 'List filtering',
    expr: '[1, 2, 3].filter(x, x%2 != 0).size() == 2',
    expected: true,
  },
  {
    name: 'Map transformation',
    expr: "{'a': 1, 'b': 2}.map(k, k.upperAscii())",
    expected: ['A', 'B'],
  },
  {
    name: 'Deep field access',
    expr: "msg.spec.template.metadata.labels['app']",
    vars: { msg: { spec: { template: { metadata: { labels: { app: 'myapp' } } } } } },
    expected: 'myapp',
  },
  {
    name: 'Null handling',
    expr: 'type(null) == null_type && null == null',
    expected: true,
  },
  {
    name: 'Byte encoding',
    expr: 'bytes("😀") == b"\\xf0\\x9f\\x98\\x80"',
    expectError: true, // likely unsupported in some libs
  },
  {
    name: 'Type conversion',
    expr: '[1.5, 2.3, 3.1].map(x, int(x)).sum()',
    expected: 6,
  },
  {
    name: 'Priority validation',
    expr: 'lowPrio.map(p, p.score).max() < highPrio.min()',
    vars: { lowPrio: [{ score: 1 }, { score: 2 }], highPrio: [3, 4] },
    expected: true,
  },
];

describe('CEL library evaluation', () => {
  for (const testCase of testCases) {
    describe(testCase.name, () => {
      for (const lib of libraries) {
        it(`should evaluate correctly with ${lib.name}` + (testCase.expectError ? ' (expect error)' : ''), async () => {
          const evalFn = lib.evalFn;
          if (testCase.expectError) {
            await expect(() => evalFn(testCase.expr, testCase.vars)).rejects.toThrowError();
          } else {
            const result = await evalFn(testCase.expr, testCase.vars);
            expect(result).toEqual(testCase.expected);
          }
        });
      }
    });
  }
});
