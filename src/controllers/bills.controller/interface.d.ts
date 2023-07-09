export interface BillData {
  bill_date: Date;
  discount_value: number;
  total_cost: number;
  order_id: number[];
  created_at?: Date;
}