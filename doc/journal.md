# devleopment journal

Here are the steps I took in understanding the problem:

1. Read the problem statement from the Assessment Doc. (After converting the
   docx into markdown with pandoc)

2. Note the procedure and class methods provided by the `Program` class in
   `SynapsCode.cs`:

   - Main:
     - accepts "args"
     - returns 0
     - summary: fetch orders, process orders, send alerts, update orders.
     - Note: Logs "Results sent.." regardless of success or failure.
     - TODO: decide on how/where/when to handle errors; decide on logging

   - FetchMedicalEquipmentOrders:
     - accepts nothing
     - returns Object Array of orders, or empty object array
     - summary: fetch orders from API
     - Note: checks status code, but doesn't throw on error.
     - TODO: parameterize the API for mocking and testing. mock endpoint

   - ProcessOrder:
     - accepts "order"
     - returns order
     - summary: for each item in order, is item is delivered, send alert, and
       increment delivery notification
     - TODO: need some type definitions for Order and Item

   - IsItemDelivered:
     - accepts "item"
     - return bool
     - summary: compares item.status to "Delivered", ignores case
     - TODO: add unit test

   - SendAlertMessage:
     - accepts: "item", orderId
     - returns: nothing
     - TODO: paramterize API endpoint for mocking / testing. mock endpoint. log
       response.

   - IncrementDeliveryNotification
     - accepts: "item"
     - returns: nothing
     - summary: increments item.deliveryNotification
     - TODO: add unit test

   - SendAlertAndUpdateOrder
     - accepts: "order"
     - returns:
     - summary: post order to orderupdate API
     - TODO: parameterize api endpoint for mocking. mock endpoint. add logging.

   - GENERAL: maybe add jsdoc comments to all of these methods when rewriting

3. Start to sketch out what I know about the `order` object from the code

       ```
       {
         "OrderId": 0,
         "Items": [
           {
             "Status": "Delivered",
             "Description": "description",
             "deliveryNotification": 0
           }
         ]
       }
       ```

4. Decisions / TODO:

   - [x] Target deno runtime for builtin TS support, top level async/await,
         testing
   - [x] Rewrite Program class in TypeScript
   - [x] Add TS types for Item and Order
   - [x] Add unit tests for functional units
   - [x] Parameterize API calls
   - [x] Add jsdoc comments for generating documentation
   - [ ] Add logging
   - [x] Add class initializer to accept logger and API endpoints

## Time Tracking

The majority of the time on this project was spent translating the C# into TypeScript. 
