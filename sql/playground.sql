SELECT COALESCE(COUNT(o.order_id), 0) AS order_count
FROM clients AS c
LEFT JOIN bookings AS b ON c.client_dni = b.client_dni
LEFT JOIN orders AS o ON b.booking_id = o.booking_id
WHERE 
  c.client_dni = '89012345' AND 
  o.real_departure >= DATE_TRUNC('month', NOW() - INTERVAL '6 months');
