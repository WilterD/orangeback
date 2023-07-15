import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import camelizeObject from "../../utils/camelizeObject";
import { StatusError } from "../../utils/responses/status-error";
import { Bill, Payment, OrderDetails, OrderDetailsRaw } from "./types";

export default async function getBillById(billId: number): Promise<Bill> {
  const response = await pool.query({
    text: "SELECT * FROM bills WHERE bill_id = $1",
    values: [billId],
  });

  if (response.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de: ${billId}`,
      statusCode: STATUS.NOT_FOUND,
    });
  }

  const bill = camelizeObject(response.rows[0]) as unknown as Bill;

  bill.payments = await getPaymentsByBillId(bill.billId);
  bill.items = await getDetailsOrdersByBillId(bill.billId);

  return bill;
}

export async function getPaymentsByBillId(billId: number): Promise<Payment[]> {
  const response = await pool.query({
    text: "SELECT * FROM payments WHERE bill_id = $1",
    values: [billId],
  });

  return camelizeObject(response.rows) as Payment[];
}

export async function getDetailsOrdersByBillId(billId: number): Promise<OrderDetails[]> {

  const orderDetailsRowLines = await getOrderDetailsRawByBillId(billId);
  

  return orderDetailsRowLines.map((item) => {
    return {
      description: `Horas de trabajo de ${item.employeeName} en ${item.activityDescription}`,
      price: item.costHour,
      quantity: item.hoursTaken,
    };
  });
}

async function  getOrderDetailsRawByBillId(
  billId: number
): Promise<OrderDetailsRaw[]> {
  const response = await pool.query({
    text: `SELECT od.cost_hour, od.hours_taken, a.description AS activity_description, e.name employee_name
           FROM bills b
           INNER JOIN orders o ON b.order_id = o.order_id 
           INNER JOIN order_details od ON o.order_id = od.order_id 
           INNER JOIN activities a ON od.service_id = a.service_id AND od.activity_id = a.activity_id 
           INNER JOIN employees e ON od.employee_dni = e.employee_dni
           WHERE b.bill_id = $1`,
    values: [billId],
  });

  const orderDetailsRowLines = camelizeObject(
    response.rows
  ) as OrderDetailsRaw[];
  return orderDetailsRowLines;
}
