import { exportForTesting } from "../src/Program.ts";
import test from "./test.js"

console.log("IsItemDelivered")
const item = {
  Status: "Undelivered",
  Description: "yoohoo",
  deliveryNotification: 0
}

test({
  expected: false,
  actual: exportForTesting.IsItemDelivered(item),
  should: "return false if an item is undelivered"
})

item.Status = "Delivered"

test({
  expected: true,
  actual: exportForTesting.IsItemDelivered(item),
  should: "return true for a status of Delivered"
})

item.Status = "bananas"

test({
  expected: false,
  actual: exportForTesting.IsItemDelivered(item),
  should: "return false for any other value"
})

item.Status = "DeLiVeReD"

test({
  expected: true,
  actual: exportForTesting.IsItemDelivered(item),
  should: "be case insensitive"
})
