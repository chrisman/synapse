export default function test({ should, expected, actual } = {
  should: "do a thing correctly",
  expected: "what i want",
  actual: "what i got"
}) {
  const ok = expected === actual
  console.log(ok ? 'ok' : 'not ok',
    ok ? "" : `Expected: ${expected}, Actual: ${actual}`,
    "Should", should)
}
