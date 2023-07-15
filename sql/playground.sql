SELECT
  s.service_id,
  s.description,
  SUM(a.cost_hour) AS coste
FROM 
  services AS s, activities AS a
WHERE
  s.service_id = a.service_id
GROUP BY
  s.service_id,
  s.description;

SELECT
  b.booking_id,
  b.
FROM
  bookings_per_service as bps,
  booking as b
WHERE
  bps.employee_dni = '1234251223' AND
  bps.service_id = s.service_id;

INSERT INTO employees_specialties (employee_dni, service_id) SELECT '3234251223', 2 WHERE NOT EXISTS (SELECT * FROM employees_specialties WHERE employee_dni = '3234251223' AND service_id = 2);

[1,2,3] -- viejo

[3,4,5] -- nuevo

[1,2] -- lo que hay que eliminar


INSERT INTO order_details (service_id, activity_id, order_id, cost_hour, hours_taken, employee_dni, created_at)
VALUES (1, 2, 6, 25, 3, '444555666', '2023-07-12 10:30:00');

-- Codigo de ejemplo a modificar la condicion para calcular el monto total de una factura 

SELECT SUM(pod.price * pod.quantity * od2.hours_taken * od2.cost_hour) as total_bills_cost
FROM bills b
JOIN orders od ON b.order_id = od.order_id
JOIN order_details od2 ON od.order_id = od2.order_id
LEFT JOIN products_in_order_details pod 
ON od2.service_id = pod.service_id 
  AND od2.activity_id = pod.activity_id 
  AND od2.order_id = pod.order_id
LEFT JOIN activities a ON od2.service_id = a.service_id 
  AND od2.activity_id = a.activity_id
LEFT JOIN services s ON a.service_id = s.service_id;

INSERT INTO products (product_id, short_name_product, description, provider, is_ecological, price, supply_line_id, created_at)
VALUES ('PROD001', 'Detergente', 'Suavitel', 'XL.', false, 20, 1, '2023-07-12 11:45:00');

INSERT INTO products_in_order_details (service_id, activity_id, order_id, product_id, price, quantity, created_at)
VALUES (1, 2, 6, 'PROD001', 20, 2, '2023-07-12 15:30:00');

INSERT INTO bills (bill_date, discount_value, total_cost, order_id, created_at)
VALUES ('2023-07-12 15:30:00', 10, 0, 6, '2023-07-12 15:30:00');
