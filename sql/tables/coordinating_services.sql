CREATE TABLE coordinating_services (
  employee_dni VARCHAR(16) NOT NULL,
  service_id INT NOT NULL,
  reservation_time date NOT NULL,
  capacity INT NOT NULL,
  PRIMARY KEY (employee_dni, service_id),
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES workers(employee_dni) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (service_id) REFERENCES services(service_id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
