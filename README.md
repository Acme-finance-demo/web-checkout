# web-checkout

Checkout basket service. The CLI parses its options with `minimist`, so that is where
untrusted argument input enters.

```
src/cli.js        argv parsing (minimist) and the option contract
src/checkout.js   basket totals, discounts, tax
src/index.js      library entry point
test/             node:test, no test framework dependency
```

Dependency versions in `package.json` are deliberately old, so a scan has something to find.

```sh
npm install
npm test
node src/cli.js --currency JPY --coupon SPRING --item 1200 --item 3400
```
