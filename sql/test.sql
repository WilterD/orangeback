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
  s.service_id,
  s.description
FROM
  services AS s,
  employees_specialties AS es
WHERE
  es.employee_dni = '1234251223' AND
  es.service_id = s.service_id;

INSERT INTO employees_specialties (employee_dni, service_id) SELECT '3234251223', 2 WHERE NOT EXISTS (SELECT * FROM employees_specialties WHERE employee_dni = '3234251223' AND service_id = 2);

[1,2,3] -- viejo

[3,4,5] -- nuevo

[1,2] -- lo que hay que eliminar
