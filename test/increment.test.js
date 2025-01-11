import { exportForTesting } from "../src/Program.ts";
import test from "./test.js"

console.log("IncrementDeliveryNotification")
const item = {
  Status: "Undelivered",
  Description: "yoohoo",
  deliveryNotification: 0
}

exportForTesting.IncrementDeliveryNotification(item)

test({
  expected: 1,
  actual: item.deliveryNotification,
  should: "should increment a number"
})

exportForTesting.IncrementDeliveryNotification(item)

test({
  expected: 2,
  actual: item.deliveryNotification,
  should: "should increment a number"
})

item.deliveryNotification = "3"
exportForTesting.IncrementDeliveryNotification(item)

test({
  expected: 4,
  actual: item.deliveryNotification,
  should: "should coerce strings if possible"
})


/* TODO
item.deliveryNotification = "banana"
exportForTesting.IncrementDeliveryNotification(item)

test({
  expected: Number.NaN,
  actual: item.deliveryNotification,
  should: "fail on NaN"
})
*/
