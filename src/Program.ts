import { Item, Order } from './types.d.ts'

export default class Program {
  orderapiurl: string;
  alertapiurl: string;
  updateapiurl: string;
  logger: any;

  /**
   * @param {string} orderapiurl - url to fetch orders
   * @param {string} alertapiurl - url to post alerts
   * @param {string} updateapiurl - url to post updated orders
   * @param {any} logger - program to post logs
   */
  constructor(
    orderapiurl: string,
    alertapiurl: string,
    updateapiurl: string,
    logger: any,
  ) {
    this.orderapiurl = orderapiurl;
    this.alertapiurl = alertapiurl;
    this.updateapiurl = updateapiurl;
    this.logger = logger;
  }

  /**
   * I Get a list of orders from the API
   * I check if the order is in a delviered state, If yes then send a
   * delivery alert and add one to deliveryNotification
   * I then update the order.
   */
  async Main(_args: any): Promise<void> {
    this.logger("Hello, World!");
    const medicalEquipmentOrders = await this.FetchMedicalEquipmentOrders();
    for (const order of medicalEquipmentOrders) {
      const updatedOrder = this.ProcessOrder(order);
      await this.SendAlertAndUpdateOrder(updatedOrder);
    }
    this.logger("Results sent to relevant APIs.");
  }

  /**
   * Fetch orders
   * @returns {Promise<Order[]>} An array of Orders, or on failure an empty array
   */
  async FetchMedicalEquipmentOrders(): Promise<Order[]> {
    let orders = []

    try {
      const res = await fetch(this.orderapiurl);
      orders = await res.json();
    } catch (err) {
      this.logger(`ERR: cannot fetch orders`, err);
    }

    return orders
  }

  /**
   * Process orders
   * @param {Order} order
   * @returns {Order} order
   */
  ProcessOrder(order: Order): Order {
    const items = order.Items;
    for (const item of items) {
      if (this.IsItemDelivered(item)) {
        this.SendAlertMessage(item, order.OrderId);
        this.IncrementDeliveryNotification(item);
      }
    }
    return order;
  }

  /**
   * Checks Item status to see if the item is delivered
   * @param {Item} item
   * @returns {boolean} item.status === "delivered"
   */
  IsItemDelivered(item: Item): boolean {
    return item.Status.toLowerCase() === "delivered";
  }

  /**
   * Checks Item status to see if the item is delivered
   * @param {Item} item
   * @param {number} orderId
   */
  async SendAlertMessage(item: Item, orderId: number): Promise<void> {
    const message =
      `Alert for delivered item: Order ${orderId}, Item: ${item.Description}
    Delivery Notifications: ${item.deliveryNotification}`;
    try {
      await fetch(this.alertapiurl, {
        method: "POST",
        body: message,
      });
      this.logger(`Alert sent for delivered item: ${item.Description}`);
    } catch (err) {
      this.logger(
        `ERR: Failed to send alert for delivered item: ${item.Description}`,
        err,
      );
    }
  }

  /**
   * Increments an item's notification count
   * @param {Item} item
   */
  IncrementDeliveryNotification(item: Item): void {
    if (typeof item.deliveryNotification === 'string')
      item.deliveryNotification = parseInt(item.deliveryNotification, 10);
    item.deliveryNotification = item.deliveryNotification + 1;
  }

  /**
   * Updates order
   * @param {Order} order
   */
  SendAlertAndUpdateOrder(order: Order) {
    try {
      fetch(this.updateapiurl, {
        method: "POST",
        body: JSON.stringify(order),
      });
      this.logger(
        `Updated order sent for processing: OrderId ${order.OrderId}`,
      );
    } catch (err) {
      this.logger(
        `ERR: Failed to send updated order for processing: OrderId ${order.OrderId}`,
        err,
      );
    }
  }
}

// just for testing
export const exportForTesting = {
  IncrementDeliveryNotification: new Program('','','','').IncrementDeliveryNotification,
  IsItemDelivered: new Program('','','','').IsItemDelivered
}
