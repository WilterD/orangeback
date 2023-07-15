import { Request, Response } from "express";
import { pool } from "../../database";
import { STATUS } from "../../utils/constants";
import { handleControllerError } from "../../utils/responses/handleControllerError";
import camelizeObject from "../../utils/camelizeObject";

const getBillsCreateDataFromRequestBody = async (req: Request): Promise<any[]> => {
  const { billDate, discountValue, orderId } = req.body;
  const newBill = [billDate, discountValue, orderId];

  // Obtener el monto total de los productos en products_in_order_details
const { rows: rows1 } = await pool.query({
  text: `SELECT price, quantity
         FROM products_in_order_details
         WHERE order_id = $1`,
  values: [orderId],
});

const productsTotal = rows1.reduce((total, { price, quantity }) => {
  return total + (price * quantity);
}, 0);

// Obtener el monto total de las actividades en order_details
const { rows: rows2 } = await pool.query({
  text: `SELECT cost_hour, hours_taken
         FROM order_details
         WHERE order_id = $1`,
  values: [orderId],
});

const activitiesTotal = rows2.reduce((total, { cost_hour, hours_taken }) => {
  return total + (cost_hour * hours_taken);
}, 0);

// Calcular el monto total de la orden
const totalCost = (productsTotal + activitiesTotal);

  // Agregar el monto total a la lista de valores de la factura
  newBill.push(totalCost);

  return newBill;
};

export const addBill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newBill = await getBillsCreateDataFromRequestBody(req);

    const insertar = await pool.query({
      text: `INSERT INTO bills 
          (bill_date, discount_value, order_id, total_cost) 
          VALUES ($1, $2, $3, $4) 
          RETURNING bill_id`,
      values: newBill,
    });

    return res.status(STATUS.CREATED).json(camelizeObject(insertar.rows[0]));
  } catch (error: unknown) {
    return handleControllerError(error, res);
  }
};
