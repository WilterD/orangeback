CREATE TABLE employees_coordinate_services (
  employee_dni dom_dni NOT NULL,
  service_id INTEGER NOT NULL,
  reservation_time dom_reservation_time NOT NULL,
  capacity INTEGER NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
