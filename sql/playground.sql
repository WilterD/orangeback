-- Cantidad de Ordenes de un cliente dado en los últimos 6 meses
SELECT COALESCE(COUNT(o.order_id), 0) AS order_count
FROM clients AS c
LEFT JOIN bookings AS b ON c.client_dni = b.client_dni
LEFT JOIN orders AS o ON b.booking_id = o.booking_id
WHERE 
  c.client_dni = '89012345' AND 
  o.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months');

SELECT
  d.percentage
FROM
  orders AS o,
  employees AS e,
  discounts AS d
WHERE
  o.order_id = 1 AND
  o.employee_dni = e.employee_dni AND
  e.agency_rif = d.agency_rif AND
  ();
  