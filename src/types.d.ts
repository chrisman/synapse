export interface Item {
  Status: "Delivered" | "Undelivered";
  Description: string;
  deliveryNotification: number;
}

export interface Order {
  OrderId: number;
  Items: Item[];
}
