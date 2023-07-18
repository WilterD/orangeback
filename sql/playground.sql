-- Cantidad de Ordenes de un cliente dado en los últimos 6 meses
SELECT COALESCE(COUNT(o.order_id), 0) AS order_count
FROM clients AS c
LEFT JOIN bookings AS b ON c.client_dni = b.client_dni
LEFT JOIN orders AS o ON b.booking_id = o.booking_id
WHERE 
  c.client_dni = '12345678' AND 
  o.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months');

SELECT
  COALESCE(d.percentage, 0) AS percentage
FROM
  orders AS o,
  bookings AS b,
  discounts AS d
WHERE
  o.order_id = 1 AND
  o.booking_id = b.booking_id AND
  b.agency_rif = d.agency_rif AND
  d.services_min <= (
    SELECT COALESCE(COUNT(o.order_id), 0) AS order_count
    FROM clients AS c
    LEFT JOIN bookings AS b ON c.client_dni = b1.client_dni
    LEFT JOIN orders AS o ON b1.booking_id = o1.booking_id
    WHERE 
      c.client_dni = b.booking_id AND 
      o.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months')
  );

SELECT
  COALESCE(MAX(d.percentage), 0) AS percentage
FROM
  orders AS o
  JOIN bookings AS b ON o.booking_id = b.booking_id
  JOIN discounts AS d ON b.agency_rif = d.agency_rif
WHERE
  o.order_id = 1 AND
  d.services_min <= (
    SELECT COALESCE(COUNT(o1.order_id), 0) AS order_count
    FROM clients AS c
    JOIN bookings AS b1 ON c.client_dni = b1.client_dni
    JOIN orders AS o1 ON b1.booking_id = o1.booking_id
    WHERE 
      c.client_dni = b.client_dni AND 
      o1.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months')
  ) AND
  d.services_max >= (
    SELECT COALESCE(COUNT(o1.order_id), 0) AS order_count
    FROM clients AS c
    JOIN bookings AS b1 ON c.client_dni = b1.client_dni
    JOIN orders AS o1 ON b1.booking_id = o1.booking_id
    WHERE 
      c.client_dni = b.client_dni AND 
      o1.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months')
  );
