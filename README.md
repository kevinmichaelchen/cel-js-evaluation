# CEL JS Evaluation

[cel]: https://cel.dev/

Evaluating different [CEL][cel] (Common Expression Language) libraries in the JS
ecosystem.

## CEL Library Conformance Summary

| Library                                                | Conformant Tests | Total Tests | Conformance % |
| ------------------------------------------------------ | ---------------- | ----------- | ------------- |
| [`@gresb/cel-javascript`][cel-javascript]              | 8                | 32          | 25.0%         |
| [`@kevinmichaelchen/cel-typescript-core`][cel-rust-ts] | 28               | 32          | 87.5%         |
| [`cel-js`][cel-js]                                     | 14               | 32          | 43.8%         |
| [`jafaircl/cel`][jafaircl-cel]                         | 13               | 32          | 40.6%         |

[cel-rust]: https://github.com/clarkmcc/cel-rust
[cel-rust-ts]:
  https://www.npmjs.com/package/@kevinmichaelchen/cel-typescript-core
[cel-javascript]: https://www.npmjs.com/package/@gresb/cel-javascript
[cel-js]: https://www.npmjs.com/package/cel-js
[jafaircl-cel]: https://github.com/jafaircl/cel

## Recommendation

Based on the conformance summary, we recommend using
[`@kevinmichaelchen/cel-typescript-core`][cel-rust-ts] for CEL evaluation in the
JS ecosystem. Its underlying implementation, [cel-rust][cel-rust], is vastly
more feature-complete than alternatives. It checks most boxes and passes most
tests. It's actively maintained.

## CEL Feature Conformance Matrix

The following table shows which CEL features are supported by each library:

| Feature                   | Example Expression                                                            | `@gresb/cel-javascript` | `@kevinmichaelchen/cel-typescript-core` | `cel-js` | `jafaircl/cel` |
| ------------------------- | ----------------------------------------------------------------------------- | :---------------------: | :-------------------------------------: | :------: | :------------: |
| Type checking             | `type(42) == int`                                                             |           ❌            |                   ✅                    |    ✅    |       ✅       |
| Macro: `has`              | `has(msg.subfield)`                                                           |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Macro: `all`              | `[1,2,3].all(x, x > 0)`                                                       |           ❌            |                   ✅                    |    ✅    |       ✅       |
| Macro: `exists`           | `[1,2,-1].exists(x, x < 0)`                                                   |           ❌            |                   ✅                    |    ✅    |       ✅       |
| Macro: `exists_one`       | `{'a': 1, 'b': 2}.exists_one(k, k == 'c')`                                    |           ❌            |                   ✅                    |    ❌    |       ❌       |
| String: `contains`        | `"hello".contains("ell")`                                                     |           ✅            |                   ✅                    |    ✅    |       ✅       |
| String: `startsWith`      | `"apple".startsWith("app")`                                                   |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Ternary operator          | `true ? "yes" : "no"`                                                         |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Operator precedence       | `1 + 2 * 3 == 7`                                                              |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Regex match               | `"hello123".matches("hello[0-9]+")`                                           |           ❌            |                   ✅                    |    ❌    |       ❌       |
| Numeric overflow handling | `9223372036854775807 + 1`                                                     |           ❌            |                   ✅                    |    ❌    |       ❌       |
| Homogeneous equality      | `1 == 1.0`                                                                    |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Timezone handling         | `timestamp("2020-01-01T00:00:00Z") == timestamp("2020-01-01T01:00:00+01:00")` |           ❌            |                   ✅                    |    ❌    |       ❌       |
| Time arithmetic           | `timestamp('2023-01-01T00:00:00Z') + duration('1h')`                          |           ❌            |                   ✅                    |    ❌    |       ❌       |
| Membership test           | `x in [1, 2, 3]`                                                              |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Dynamic typing            | `dyn(5) == 5u && dyn(3.14) > 3`                                               |           ❌            |                   ✅                    |    ❌    |       ❌       |
| List filtering            | `[1, 2, 3].filter(x, x%2 != 0)`                                               |           ❌            |                   ✅                    |    ❌    |       ❌       |
| Deep field access         | `msg.spec.template.metadata.labels['app']`                                    |           ✅            |                   ✅                    |    ✅    |       ✅       |
| Byte encoding             | `bytes("😀") == b"\xf0\x9f\x98\x80"`                                          |           ❌            |                   ✅                    |    ✅    |       ❌       |
