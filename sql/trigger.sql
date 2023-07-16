CREATE OR REPLACE FUNCTION update_bill_total_cost() RETURNS TRIGGER AS $$
DECLARE
  new_total_cost_activities FLOAT;
  new_total_cost_products FLOAT;
  new_total_cost FLOAT;
BEGIN
  -- Obtener la suma de los costos por hora multiplicados por las horas tomadas en la orden
  SELECT SUM(cost_hour * hours_taken)
  INTO new_total_cost_activities
  FROM order_details
  WHERE order_id = NEW.order_id;

  -- Obtener la suma de los precios de los productos en la orden
  SELECT COALESCE(SUM(price * quantity), 0)
  INTO new_total_cost_products
  FROM products_in_order_details
  WHERE order_id = NEW.order_id;

  -- Sumar la suma de los costos y la suma de los precios de los productos y restar el valor del descuento
  new_total_cost = new_total_cost_activities + COALESCE(new_total_cost_products, 0);

  -- Actualizar el valor de total_cost en la tabla bills
  UPDATE bills
  SET total_cost = new_total_cost
  WHERE order_id = NEW.order_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bill_total_cost_trigger
AFTER INSERT OR UPDATE OR DELETE ON order_details
FOR EACH ROW
EXECUTE FUNCTION update_bill_total_cost();

CREATE TRIGGER update_bill_total_cost_products_trigger
AFTER INSERT OR UPDATE OR DELETE ON products_in_order_details
FOR EACH ROW
EXECUTE FUNCTION update_bill_total_cost(NEW);

CREATE TRIGGER update_new_bill_total_cost_trigger
AFTER INSERT ON bills
FOR EACH ROW
EXECUTE FUNCTION update_bill_total_cost(NEW);