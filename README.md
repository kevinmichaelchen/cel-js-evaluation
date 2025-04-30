# CEL JS Evaluation

[cel]: https://cel.dev/

Evaluating different [CEL][cel] (Common Expression Language) libraries in the JS
ecosystem.

## Libraries Evaluated

- [`@kevinmichaelchen/cel-typescript-core`][cel-rust-ts]
- [`@gresb/cel-javascript`][cel-javascript]
- [`ChromeGG/cel-js`][cel-js]
- [`jafaircl/cel`][jafaircl-cel]

[cel-rust-ts]:
  https://www.npmjs.com/package/@kevinmichaelchen/cel-typescript-core
[cel-javascript]: https://www.npmjs.com/package/@gresb/cel-javascript
[cel-js]: https://www.npmjs.com/package/cel-js
[jafaircl-cel]: https://github.com/jafaircl/cel

> [!NOTE]
>
> For the [jafaircl-cel][jafaircl-cel] library, one of its dependencies needs to
> be pulled from a separate registry, hence the `.npmrc` file. You can also
> manually configure it with:
>
> ```
> pnpm config set @buf:registry https://buf.build/gen/npm/v1/
> ```

## CEL Library Conformance Summary

| Library                                 | Conformant Tests | Total Tests | Conformance % |
| --------------------------------------- | ---------------- | ----------- | ------------- |
| `@gresb/cel-javascript`                 | 11               | 29          | 37.9%         |
| `@kevinmichaelchen/cel-typescript-core` | 24               | 29          | 82.8%         |
| `cel-js`                                | 15               | 29          | 51.7%         |
| `jafaircl/cel`                          | 10               | 29          | 34.5%         |
