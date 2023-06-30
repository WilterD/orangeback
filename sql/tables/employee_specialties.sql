CREATE TABLE employee_specialties (
  employee_dni VARCHAR(16),
  service_id INTEGER,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employee(employee_dni) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
