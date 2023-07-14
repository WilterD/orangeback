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
