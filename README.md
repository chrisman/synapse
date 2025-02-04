# Synapse Code Assessment

Hello!

## What you will find here

```
.
├── README.md                1
├── deno.json                2
├── doc                      3
│   ├── SynapseAssessment.md 4
│   ├── SynapseCode.cs       5
│   └── journal.md           6
├── docs                     7
│   ├── ...                  8
├── src                      9
│   ├── Program.ts           10
│   └── types.d.ts           11
└── test                     12
    ├── Program.test.ts      13
    ├── increment.test.js    14
    ├── isdelivered.test.js  15
    ├── orders.json          16
    └── test.js              17

6 directories, 37 files
```

-  1 - README.md: you're reading it!
-  2 - deno.json: just a couple of task definitions for development
-  6 - journal.md: some notes taken while working on this
-  7 - autogenerated docs. run `deno task docs`
- 10 - the Program class, rewritten in typescript
- 11 - type declaration file for Items and Orders
- 13 - end-to-end testing for Program.ts
- 14 - unit test for Program.IncrementDeliveryNotification
- 15 - unit test for Program.IsItemDelivered
- 16 - json database for testing
- 17 - a simple test harness

## Dependencies

What was used to build this

- deno 2.0.4: typescipt runtime with builtin testing, formatting, linting, etc. https://deno.com/
- json-server: installed and used by `deno task dev` via npx. (If you have node installed, it should work)

## Getting started

1. install deno.

2. run the test server:

    ```
    deno task dev
    ```

3. run the tests:

    ```
    deno task test
    ```

## Docs

open `docs/index.html` for documentation. this is autogenerated from method signatures and jsdocs with `deno task docs`
