CREATE TABLE employees_specialties (
  employee_dni dom_dni,
  service_id INTEGER,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
