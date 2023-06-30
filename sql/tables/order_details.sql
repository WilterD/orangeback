CREATE TABLE order_details (
  service_id INTEGER NOT NULL,
  activity_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  cost_hour FLOAT NOT NULL,
  hours_taken INTEGER NOT NULL,
  employee_dni dom_dni NOT NULL,
  created_at dom_created_at,
  PRIMARY KEY (service_id, activity_id, order_id),
  CONSTRAINT fk_12 FOREIGN KEY (service_id, activity_id) 
    REFERENCES activities(service_id, activity_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_employee_dni FOREIGN KEY (employee_dni) REFERENCES employees(employee_dni)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
