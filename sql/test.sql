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