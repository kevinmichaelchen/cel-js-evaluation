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
